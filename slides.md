---
# try also 'default' to start simple
theme: default
# apply any windi css classes to the current slide
# class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: true
# persist drawings in exports and build
drawings:
  persist: false
# page transition
transition: slide-left
# use UnoCSS
css: unocss
layout: cover
---

# Problema do Clique
## Vinicius José Fritzen
---
layout: section
---
# 1. Introdução

---

## 1.1 O que é um clique?
Clique é um subgrafo completo de um outro grafo. Assim um clique contem apenas vertices que estão conectados a todos os outros vertices.

O tamanho de um clique é o número vértices que participam del

Um clique é **máximo** se não houver outro clique de tamanho maior neste grafo.

![Grafo](/grafo1.png)


---

### Problema do Clique de Otimização
O problema original do clique é um problema de *otimização*.

As suas instâncias são $(G)$ onde:
- $G = (V, A)$ é um grafo composto de vertices($V$) e arrestas($A = (v_1, v_2)$).

O problema do clique é encontrar um clique máximo de um grafo.

---
layout: two-cols
---

<template v-slot:default>

#### Exemplo

![Grafo1](/grafo2.png)
</template>

<template v-slot:right>
<v-clicks>

 - clique máximo: {verde, vermelho, roxo} ou {verde, vermelho, laranja}
 - Tamanho: 3

</v-clicks>
</template>

--- 
layout: two-cols
---

<template v-slot:default>

![Grafo2](/grafo3.png)
</template>

<template v-slot:right>
<v-clicks>

 - clique máximo: {verde, vermelho, roxo, laranja}
 - Tamanho: 4

</v-clicks>
</template>


---

### Problema de Decisão: K-Clique
Pelo clique originalmente ser um problema de otimização teremos que usar uma outra versão dele para provar sua NP-completude: o *K-Clique*.

O problema do K-Clique tem como instância $(G, k)$ onde:
- $G$ é um grafo da mesma forma que no clique.
- $k \in \mathbb N$.

O problema consiste em decidir se um grafo contém ao menos um clique de tamanho $k$ ou maior.


---
layout: two-cols
---

<template v-slot:default>

### Exemplo

![Grafo3](/grafo2.png)

</template>

<template v-slot:right>
<v-clicks>

 - $k = 1$? Sim
 - $k = 2$? Sim
 - $k = 3$? Sim
 - $k = 4$? **Não**

</v-clicks>
</template>

---

## K-Clique é NP:
Para provar que K-clique é NP, mostrarei um algoritmo que válida uma solução se dado um certificado.

### Certificado do K-Clique
O certificado $C$ é o clique encontrado, e esse algoritmo verifica que ele realmente se encontra no grafo $G$ e é maior que $k$.

<!-- Dividir em duas colunas -->
<div class="grid grid-cols-2 gap-4">
    <div>
        k=4
        G= 
        <img src="/np_or.svg">
    </div>
    <div>
        C=
        <img src="/np_c1.svg">
    </div>
</div>
<v-click>

	Não é clique, pois não é completo.

</v-click>


---

<div class="grid grid-cols-2 gap-4">
    <div>
        k=4
        G= 
        <img src="/np_or.svg">
    </div>
    <div>
        C=
        <img src="/np_c2.svg">
    </div>
</div>
<v-click>

Não é clique, pois não é completo.

</v-click>

---

<div class="grid grid-cols-2 gap-4">
    <div>
        k=3
        G= 
        <img src="/np_or.svg">
    </div>
    <div>
        C=
        <img src="/np_c3.svg">
    </div>
</div>
<v-click>

É um clique de tamanho 3, então é válido.

</v-click>

---

### Algoritmo de verificação
``` rust 
fn verifica_validade(G: Grafo, k: i32, C: Grafo) -> bool {
    if C.vert_count < k {return false}
    
    for (vert in C.V) {
        if (!G.V.contains(vert)) return false;
        
        for (other in C.V) {
            if ( other == vert) continue;
            if (!G.A.contains(vert,other)) return false;
        }
    }
    
    return true;
}
```
<v-click>

O algoritmo verifica se o clique é maior que k, se todos os vertices estão no grafo e se todos os vertices estão conectados.

$$ O(1) + \sum_{i=1}^n (\sum_{j=1}^n (O(1) + O(n))) = O(n^3) $$

</v-click>

---

## K-Clique é NP-difícil
Prova que K-Clique é NP-difícil usando redução do CNF-3SAT.
---

O CNF-3SAT é um problema de decisão onde a instância é uma formula CNF de 3SAT.

O problema consiste em decidir se uma formula CNF de 3SAT é satisfazível ou não. Ou seja se existe uma atribuição de valores verdadeiros para as variáveis que faz a formula ser verdadeira.

Exemplo:
$$
\begin{align}
    (x_1 \lor x_2 \lor x_3) \land (x_1 \lor x_2 \lor x_4) \land (x_1 \lor x_3 \lor x_4) \land (x_2 \lor x_3 \lor x_4)
\end{align}
$$

Essa formula é satisfazível, pois podemos escolher $x_1 = x_2 = 1$.

Observe que ela é satisfazível, pois é possível encontrar uma variável em cada clausula que é verdadeira e de forma que nenhum literal seja negado e afirmado ao mesmo tempo.


---

### Exemplo de formula CNF-3SAT não satisfazível

$$
\begin{align}
    (x_1 \lor x_1 \lor x_1) \land (\neg x_1 \lor \neg x_1 \lor \neg x_1)
\end{align}
$$
Independente de qual valor atribuirmos a $x_1$, a formula sempre será falsa.

Usaremos uma redução do CNF-3SAT para K-Clique para provar que K-Clique é NP-difícil.

---

### Redução do CNF-3SAT para K-Clique

Considerando uma formula CNF de 3SAT($\phi$) de $n$ cláusulas em conjunção, na qual cada
cláusula $C_i$ é uma disjunção de 3 literais $L_{1}^{i}, L_{2}^{i}, L_{3}^{i}$.
$$ C_i = (L_{i}^{1} \lor L_{i}^{2} \lor L_{i}^{3}) $$
$$ \phi = \bigwedge_{i=1}^{n} C_i $$

Construiremos um grafo $G = (V, A)$ onde:
 - Para cada cláusula $C_r$ da formula CNF, teremos uma tripla de vértices $v_{1}^{r}, v_{2}^{r}, v_{3}^{r}$.
 - Inserimos uma arresta entre dois vértices $v_{1}^{r}, v_{2}^{r}$ se, e somente se ambas as afirmativas forem verdadeiras:
    - $v_{i}^{r}$ e $v_{j}^{s}$ são vértices de cláusulas diferentes. Ou seja, $r \neq s$;
    - $L_{i}^{r}$ e $L_{j}^{s}$ não são literais complementares. Ou seja, $L_{i}^{r} \neq \neg L_{j}^{s}$.

---

Seja $G = (V, A)$ o grafo construido, então:
 - Se G contem um clique de tamanho $n$, então $\phi$ é satisfazível;
 - Se G não contém um clique de tamanho $n$, então $\phi$ não é satisfazível.

---

## Exemplo:
$$
\begin{align}
    (x_1 \lor x_2 \lor x_3) \land (x_1 \lor x_2 \lor x_4)
\end{align}
$$

<img v-click="1" src="/np_2c_0.svg">

---

$$
\begin{align}
    (x_1 \lor x_2 \lor x_3) \land (x_1 \lor x_2 \lor x_4)
\end{align}
$$

<img src="/np_2c_1.svg">

---

$$
\begin{align}
    (x_1 \lor x_2 \lor x_3) \land (x_1 \lor x_2 \lor x_4)
\end{align}
$$

<img src="/np_2c_2.svg">

---

$$
\begin{align}
    (x_1 \lor x_2 \lor x_3) \land (x_1 \lor x_2 \lor x_4)
\end{align}
$$

<img src="/np_2c_3.svg">

Como podemos ver, o grafo contem um clique de tamanho 2, então a formula é satisfazível.
Podemos atribuir $x_1 = 1$.

---

## Outro exemplo

$$
\begin{align}
    (x_1 \lor x_1 \lor x_1) \land (\neg x_1 \lor \neg x_1 \lor \neg x_1)
\end{align}
$$

<img v-click src="/np_2c_4.svg">

<v-click>

Como podemos ver, o grafo não contem um clique de tamanho 2, então a formula não é satisfazível.

</v-click>


---

``` rust
fn sat_to_kclique(sat: Sat) {
    let grafo = Grafo();// Contem as informações de qual era a clausula original do vertice
    let clausulasDeOrigem = Mapa<Vertice, int>();
    for (clausula in sat.clausulas) {
        let v1 = grafo.add_vertice(clusula.l1);
        clausulasDeOrigem.add(v1, clausula.n);
        let v2 = grafo.add_vertice(clausula.l2);
        clausulasDeOrigem.add(v2, clausula.n);
        let v3 = grafo.add_vertice(clausula.l3);
        clausulasDeOrigem.add(v3, clausula.n);
    }
    for (let vertice in grafo) {
        for (let outro_vertice in grafo) {
            if (vertice == outro_vertice) continue;
            if (
                clausulasDeOrigem.deClausulasDiferentes(vertice, outroVertice) 
                && vertice != not(outro_vertice)
            ) {
                grafo.add_aresta(vertice, outro_vertice);
            }
        }
    }
    return (grafo, sat.clausulas.length()) // k é o numero de clausulas
}
```


---

## Análise da complexidade do Algoritmo

``` rust
fn sat_to_kclique(sat: Sat) {
    let grafo = Grafo();// Contem as informações de qual era a clausula original do vertice
    let clausulasDeOrigem = Mapa<Vertice, int>();
    for (clausula in sat.clausulas) { // n * 
        let v1 = grafo.add_vertice(clusula.l1); // O(1)
        clausulasDeOrigem.add(v1, clausula.n);// O(1)
        let v2 = grafo.add_vertice(clausula.l2);// O(1)
        clausulasDeOrigem.add(v2, clausula.n);// O(1)
        let v3 = grafo.add_vertice(clausula.l3);// O(1)
        clausulasDeOrigem.add(v3, clausula.n);// O(1)
    }
    for (let vertice in grafo) { // n *
        for (let outro_vertice in grafo) { // n *
            if (vertice == outro_vertice) continue;// O(1)
            if (
                clausulasDeOrigem.deClausulasDiferentes(vertice, outroVertice) // O(1)
                && vertice != not(outro_vertice)// O(1)
            ) {
                grafo.add_aresta(vertice, outro_vertice);// O(1)
            }
        }
    }
    return (grafo, sat.clausulas.length()) // k é o numero de clausulas
}
```


---

## Análise da complexidade do Algoritmo

$$
\begin{align}
    \sum_{i=1}^{n} O(1) + \sum_{i=1}^{n} \sum_{j=1}^{n} O(1) = O(n^2)
\end{align}
$$

Esta redução é polinomial, pois o número de vértices do grafo é polinomial no tamanho da entrada.


---

## Conclusão

- O algoritmo de redução do CNF-3SAT para K-Clique é polinomial;
- O algoritmo de verificação de clique em um grafo é polinomial;
- Portanto, ***o K-Clique é NP-completo.***

---

## Referências

Algoritmos: Teoria e Prática, 3ª Edição, Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein


---

## Agradeço pela atenção.

Os slides estão disponíveis em:

https://vini84200.github.io/clique-slidev
