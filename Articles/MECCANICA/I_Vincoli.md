---
titolo: I Vincoli
descrizione: AEROBLOG Home Appunti Contatti ← Torna all'indice MECCANICA RAZIONALE I Vincoli Limitazioni al moto e condizio…
categoria: MECCANICA
tags: 
data: 2026-11-09
bozza: si
---

## I Vincoli

Limitazioni al moto e condizioni cinematiche nei sistemi rigidi

I **vincoli** sono condizioni fisiche che limitano i movimenti del sistema che stiamo considerando. Essi riducono i gradi di libertà del corpo, imponendo restrizioni sulle posizioni (vincoli olonomi) o sulle velocità (vincoli anolonomi).

**Reazione Vincolare:** Ogni vincolo agisce sul sistema attraverso una forza (o un momento) detta reazione vincolare, che si oppone al movimento proibito.

## Tipologie di Vincoli nel Piano

### 1. Cerniera (Appoggio Fisso)

Questo vincolo impedisce ogni traslazione del punto in cui è applicato, ma permette la rotazione attorno ad esso. Elimina 2 gradi di libertà.

\[ \vec{v}_P = \vec{0} \implies \dot{x}_P = 0, \dot{y}_P = 0 \]

### 2. Carrello (Appoggio Mobile)

Il carrello impedisce la traslazione solo lungo la direzione normale (\(\hat{n}\)) al piano di appoggio, permettendo il movimento tangente e la rotazione.

\[ \vec{v}_P \cdot \hat{n} = 0 \]

### 3. Incastro

È il vincolo più restrittivo: impedisce sia le traslazioni che la rotazione. Elimina tutti i 3 gradi di libertà nel piano.

\[ \vec{v}_P = \vec{0}, \quad \omega = 0 \]

[attachment_0](attachment)

* * *

## Bibliografia

*   **Biscari, P., Ruggeri, T., Saccomandi, G., & Vianello, M.** (2016). _Meccanica Razionale per l'Ingegneria_. Monduzzi Editoriale. Testo di riferimento per la formalizzazione matematica dei vincoli e dei sistemi meccanici.

### Argomenti correlati

*   [Cinematica nel piano](Cinematica_2D.html)
*   [Equazioni Cardinali e Reazioni Vincolari](Equazioni_cardinali.html)
