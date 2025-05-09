from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
import numpy as np
from transformers import AutoModel, BertTokenizerFast
import gensim
from gensim.models import KeyedVectors
from torch import nn
import torch


#py -3.10 -m venv venv310
#.\venv310\Scripts\activate
#uvicorn main:app --reload

app = FastAPI()

# Chargez le modèle Word2Vec
word2vec_model = KeyedVectors.load_word2vec_format('GoogleNews-vectors-negative300.bin' , binary=True)

# Chargez le tokenizer BERT
tokenizer = BertTokenizerFast.from_pretrained('bert-base-uncased')

# Paramètres
MAX_LENGTH = 15
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

# Définissez l'architecture du modèle (identique à celle utilisée pendant l'entraînement)
class BERT_Arch(nn.Module):
    def __init__(self, bert, w2v_dim=300):
        super(BERT_Arch, self).__init__()
        self.bert = bert
        self.dropout = nn.Dropout(0.1)
        self.relu = nn.ReLU()
        self.fc1 = nn.Linear(768 + w2v_dim, 512)
        self.fc2 = nn.Linear(512, 2)
        self.softmax = nn.LogSoftmax(dim=1)

    def forward(self, sent_id, mask, w2v_features):
        cls_hs = self.bert(sent_id, attention_mask=mask)['pooler_output']
        combined_features = torch.cat([cls_hs, w2v_features], dim=1)
        x = self.fc1(combined_features)
        x = self.relu(x)
        x = self.dropout(x)
        x = self.fc2(x)
        x = self.softmax(x)
        return x

# Chargez le modèle BERT
bert = AutoModel.from_pretrained('bert-base-uncased')

# Initialisez et chargez les poids de votre modèle
model = BERT_Arch(bert)
model.load_state_dict(torch.load('model/model_weights.pt', map_location=device))
model = model.to(device)
model.eval()

# Fonction pour obtenir les features Word2Vec
def get_word2vec_features(texts, model, dim=300):
    features = []
    for text in texts:
        words = text.split()
        word_vectors = []
        for word in words:
            if word in model:
                word_vectors.append(model[word])
        if word_vectors:
            features.append(np.mean(word_vectors, axis=0))
        else:
            features.append(np.zeros(dim))
    return np.array(features)

# Modèle Pydantic pour la requête d'API
class NewsItem(BaseModel):
    text: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"] if you want to be strict
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
async def predict(news_item: NewsItem):
    try:
        # Prétraitement du texte
        text = [news_item.text]
        
        # Tokenisation BERT
        tokens = tokenizer.batch_encode_plus(
            text,
            max_length=MAX_LENGTH,
            pad_to_max_length=True,
            truncation=True
        )
        
        # Features Word2Vec
        w2v_features = get_word2vec_features(text, word2vec_model)
        
        # Conversion en tenseurs
        seq = torch.tensor(tokens['input_ids']).to(device)
        mask = torch.tensor(tokens['attention_mask']).to(device)
        w2v = torch.FloatTensor(w2v_features).to(device)
        
        # Prédiction
        with torch.no_grad():
            outputs = model(seq, mask, w2v)
            preds = torch.argmax(outputs, dim=1)
        
        # Résultat
        prediction = "Fake" if preds.item() == 1 else "True"
        confidence = torch.exp(outputs).max().item()  # Convertit log-prob en probabilité
        
        return {
            "text": news_item.text,
            "prediction": prediction,
            "confidence": confidence
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# FastAPI endpoint
@app.post("/prediction/")
def predict(request: NewsItem):
    try:
        result = predict(request.text)
        return {"prediction": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/")
async def root():
    return {"message": "Fake News Detection API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)