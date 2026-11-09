---
titolo: Teorema di Thévenin
descrizione: Equivalenza / Semplificazione sfruttando il Teorema di Thévenin e il suo funzionamento
categoria: ELETTROTECNICA
tags: 
data: 2026-11-09
bozza: si
---

## Teorema di Thévenin

Definizione, funzionamento, equivalenze e applicazioni con esempi pratici.

Il **teorema di Thévenin** è uno dei principali strumenti usati nell'elettrotecnica per semplificare una rete elettrica complessa, trasformandola in un circuito equivalente più semplice visto da due morsetti.

![Diagramma del Teorema di Thévenin: Circuito Originale trasformato in Circuito Equivalente, con i valori di tensione e resistenza specificati e la spiegazione dell'equivalenza ai terminali.](../../Images/Articles/PEE/thevenin.jpg)

Figura 1: Illustrazione del Teorema di Thévenin, che mostra la semplificazione da un circuito a due terminali (M, N) a un circuito equivalente con un generatore di tensione (Vth) e una resistenza (Rth) in serie. Il comportamento ai morsetti M-N rimane lo stesso.

## Sviluppo Teorico

Data una rete lineare accessibile da due morsetti (spesso indicati con A e B), è possibile sostituire l'intera rete con un generatore ideale di tensione \(V_{th}\) in serie a una resistenza \(R_{th}\):

*   **\(V_{th}\) (Tensione di Thévenin):** è la tensione a vuoto presente ai morsetti A e B.
*   **\(R_{th}\) (Resistenza di Thévenin):** è la resistenza equivalente vista dai morsetti quando tutti i generatori indipendenti all'interno della rete sono disattivati (spenti).

**Equivalenza Thévenin-Norton:**

$$ (V_{th}, R_{th}) \quad \Longleftrightarrow \quad (I_{no}, R_{no}) $$

Questa dualità è valida ricordando che il modello di Thévenin prevede la resistenza in **serie** al generatore di tensione, mentre il modello di Norton prevede la resistenza in **parallelo** al generatore di corrente, con la relazione: $$ I_{no} = \frac{V_{th}}{R_{th}} \quad \text{e} \quad R_{no} = R_{th} $$

**Equazione costitutiva al carico:**

$$ V = V_{th} - R_{th} \cdot I $$

* * *

## Fonti Consultate

*   **C. K. Alexander, M. N. O. Sadiku, G. Gruosso, G. S. Gajani** (2021). _Circuiti elettrici_. McGraw-Hill. Capitolo 4: Teoremi dei circuiti.

### Continua a leggere

*   [Teorema di Norton](#)
