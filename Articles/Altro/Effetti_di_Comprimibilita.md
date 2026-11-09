---
titolo: Effetti di Comprimibilità
descrizione: AEROBLOG Home Contatti ← Torna all'indice AERODINAMICA Effetti di Comprimibilità Analisi dei regimi di moto, v…
categoria: Altro
tags: 
data: 2026-11-09
bozza: si
---


## Effetti di Comprimibilità

Analisi dei regimi di moto, velocità del suono e numero di Mach

Nello studio dell'aerodinamica ad alte velocità, non è più possibile considerare l'aria come un fluido a densità costante. Per analizzare gli effetti di comprimibilità, dobbiamo introdurre la **velocità del suono** ($a$), definita come la velocità di propagazione di piccole perturbazioni di pressione in un mezzo elastico.

$$ a = \sqrt{\gamma R T} $$

Dalla relazione tra la velocità del fluido ($v$) e la velocità del suono locale nasce la necessità di definire un numero adimensionale fondamentale: il **Numero di Mach**.

$$ Ma = \frac{v}{a} $$

Sotto la soglia di \(Ma < 0.3\), le variazioni di densità sono trascurabili e il fluido può essere considerato **incomprimibile**. Oltre questo valore, gli effetti termodinamici diventano significativi.

## Variazioni dei Coefficienti Aerodinamici

L'aumento del numero di Mach influenza drasticamente le prestazioni di un profilo alare, in particolare agendo sui coefficienti adimensionali di portanza e resistenza:

*   **Coefficiente di Portanza \(C_L\):** In regime subsonico elevato, si osserva inizialmente un aumento dovuto alla correzione di Prandtl-Glauert, seguito da un brusco calo una volta superato il Mach critico.
*   **Coefficiente di Resistenza \(C_D\):** Al raggiungimento di velocità elevate, la resistenza aumenta in modo esponenziale. Questo fenomeno è causato dalla formazione di onde d'urto che generano la cosiddetta _resistenza d'onda_.

### Il Mach Critico \(Ma_{cr}\)

Un parametro progettuale essenziale è il **Mach critico**. Esso rappresenta la velocità di volo (corrente indisturbata) tale per cui in almeno un punto locale del profilo il fluido raggiunge la velocità del suono \(Ma_{locale} = 1\).

💡 **Analisi Tecnica:** Il raggiungimento del \(Ma_{cr}\) preannuncia l'insorgenza del regime transonico, dove iniziano a comparire le prime onde d'urto sul dorso del profilo, causando distacchi di vena e instabilità.

* * *

## Fonti Consultate

*   **Anderson, J. D.** (2021). _Introduction to Flight_.(9th ed.). McGraw-Hill Education. Testo cardine per comprendere i fenomeni di comprimbilità.

### Argomenti correlati

*   [Regimi di moto: subsonico, transonico e supersonico](#)
*   [Relazioni di salto attraverso le onde d'urto](#)
*   [Regola delle aree per velivoli supersonici](#)

