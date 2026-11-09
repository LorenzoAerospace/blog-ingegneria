---
titolo: Equazioni Cardinali
descrizione: AEROBLOG Home Contatti ← Torna alla Dashboard DINAMICA DEI SISTEMI Equazioni Cardinali Le leggi fondamentali d…
categoria: Altro
tags: 
data: 2026-11-09
---

[AEROBLOG](../../index.html)

*   [Home](../../index.html)

[Contatti](mailto:tua@mail.com)

[← Torna alla Dashboard](../../index.html)

DINAMICA DEI SISTEMI

# Equazioni Cardinali

Le leggi fondamentali del moto per sistemi materiali complessi

Le **equazioni cardinali** sono le relazioni fondamentali che descrivono la dinamica di un sistema materiale. Esse stabiliscono come le risultanti delle forze e dei momenti esterni influenzino le grandezze cinematiche globali del sistema.

$$ \begin{cases} \dot{\mathbf{Q}} = \mathbf{R}^{est} \\ \dot{\boldsymbol{\Gamma}}_O + \mathbf{v}_O \times \mathbf{Q} = \mathbf{M}_O^{est} \end{cases} $$

La prima equazione descrive la variazione della **quantità di moto** totale \(\mathbf{Q}\), mentre la seconda governa l'evoluzione del **momento della quantità di moto** \(\boldsymbol{\Gamma}_O\) rispetto a un polo \(O\).

**Nota sul Polo:** Se il polo \(O\) è fisso o coincide con il baricentro \(G\), il termine \(\mathbf{v}_O \times \mathbf{Q}\) svanisce, semplificando la seconda equazione in \(\dot{\boldsymbol{\Gamma}}_O = \mathbf{M}_O^{est}\).

## L'Equazione Pura del Moto

Dalle equazioni cardinali, proiettando sulle direzioni consentite dai vincoli, si ottiene l'**equazione pura del moto**. Si tratta di un'equazione differenziale del secondo ordine (solitamente nella variabile $q$ che rappresenta la coordinata lagrangiana) del tipo:

$$ a(q) \ddot{q} + b(q, \dot{q}) = Q(q, \dot{q}, t) $$

## Il Problema di Cauchy

Determinare l'equazione del moto non basta per sapere dove si troverà il sistema in un dato istante. Per ottenere una soluzione univoca, è necessario formulare un **Problema di Cauchy**.

Esso consiste nell'accoppiare l'equazione differenziale del moto con le **condizioni iniziali**, ovvero lo stato del sistema all'istante \(t_0\):

$$ \begin{cases} \ddot{q} = f(q, \dot{q}, t) & \text{(Equazione del moto)} \\ q(t_0) = q_0 & \text{(Posizione iniziale)} \\ \dot{q}(t_0) = \dot{q}_0 & \text{(Velocità iniziale)} \end{cases} $$

Senza queste condizioni, l'integrazione fornirebbe infinite traiettorie possibili. Assegnandole, "fissiamo" l'unica evoluzione temporale del sistema coerente con lo stato di partenza.

* * *

## Bibliografia

*   **Biscari, P., Ruggeri, T., Saccomandi, G., & Vianello, M.** (2016). _Meccanica Razionale per l'Ingegneria_. Monduzzi Editoriale. Testo essenziale per l'approccio analitico alla dinamica dei sistemi vincolati.

### Continua a leggere

*   [Dinamica del Punto Materiale](#)
*   [Il Principio di d'Alembert](#)
*   [Sistemi Conservativi e Integrali Primi](#)

© 2026 - AeroBlog
