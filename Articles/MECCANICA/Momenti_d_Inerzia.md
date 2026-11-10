---
titolo: Momenti d'Inerzia
descrizione: AEROBLOG Home Contatti ← Torna alla Dashboard MECCANICA RAZIONALE Momenti d'Inerzia La resistenza alla rotazio…
categoria: MECCANICA
tags: 
data: 2026-11-09
---

## Momenti d'Inerzia

La resistenza alla rotazione e la geometria delle masse

I **momenti d'inerzia** definiscono la resistenza che un corpo oppone al cambiamento del suo stato di moto rotatorio. Se la massa misura l'inerzia alla traslazione, il momento d'inerzia misura l'inerzia alla rotazione.

## La Matrice d'Inerzia

In una terna qualsiasi, lo stato inerziale di un corpo rigido è descritto da un tensore simmetrico:

$$ I_{gen} = \begin{bmatrix} I_{xx} & I_{xy} & I_{xz} \\ I_{yx} & I_{yy} & I_{yz} \\ I_{zx} & I_{zy} & I_{zz} \end{bmatrix} $$

Attraverso un calcolo di autovalori e autovettori, è possibile diagonalizzare la matrice per trovare la **terna principale d'inerzia**:

$$ I_{princ} = \begin{bmatrix} A & 0 & 0 \\ 0 & B & 0 \\ 0 & 0 & C \\ \end{bmatrix} $$

Dove \(A, B, C\) sono i momenti principali d'inerzia. Se il corpo possiede simmetrie geometriche, gli assi principali coincidono spesso con gli assi di simmetria.

## Calcolo Integrale

Per un corpo continuo, il momento d'inerzia rispetto a un asse si ricava integrando la distanza al quadrato degli elementi di massa dal medesimo asse:

$$ I = \int r^2 \, dm = \int_V \rho r^2 \, dV $$

Assumendo un corpo **omogeneo**, la densità \(\rho\) è costante e può essere portata fuori dall'integrale.

## Momenti d'Inerzia Notevoli

| Geometria | Asse / Punto | Momento \( I \) | Nota Tecnica |
| --- | --- | --- | --- |
| **Sistemi 2D (Cinematica Piana)** |
| Asta sottile (\( L \)) | Baricentro | \( \frac{1}{12} M L^2 \) | Distribuzione simmetrica |
| Asta sottile (\( L \)) | Estremo | \( \frac{1}{3} M L^2 \) | Uso di Huygens-Steiner |
| Disco (\( R \)) | Centro | \( \frac{1}{2} M R^2 \) | Rotazione nel piano |
| Disco (\( R \)) | CIR (bordo) | \( \frac{3}{2} M R^2 \) | Caso del rotolamento puro |
| **Sistemi 3D (Matrice Principale)** |
| Disco (piano \( xy \)) | Asse \( z \) (centro) | \( I_{zz} = \frac{1}{2} MR^2 \) | \( I_{xx} = I_{yy} = \frac{1}{4} MR^2 \) |
| Sfera piena (\( R \)) | Qualsiasi asse baricentrale | \( \frac{2}{5} MR^2 \) | Simmetria sferica totale |

**Teorema di Huygens-Steiner:** Se conosciamo il momento d'inerzia rispetto al baricentro \(I_G\), possiamo trovare quello rispetto a un asse parallelo distante \(d\) con la formula: \[ I = I_G + M d^2 \]

* * *

## Bibliografia

*   **Biscari, P., Ruggeri, T., Saccomandi, G., & Vianello, M.** (2016). _Meccanica Razionale per l'Ingegneria_. Monduzzi Editoriale. Riferimento per il calcolo del tensore d'inerzia e proprietà delle masse.

### Continua a leggere

*   [Energia Cinetica e Teorema di Koenig](Energia_cinetica.html)
*   [Equazioni Cardinali della Dinamica](Equazioni_cardinali.html)
