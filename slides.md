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
layout: image-left
image: https://upload.wikimedia.org/wikipedia/commons/d/d0/VR_complex.svg
---

## 1.1 O que é um clique?
Clique é um subgrafo completo de um outro grafo. Assim um clique contem 

O tamanho de um clique é o número vértices que participam de um clique.

Um clique é **máximo** se não houver outro clique de tamanho maior neste grafo.



---

### Problema do Clique de Otimização
O problema original do clique é um problema de *otimização*.

As suas instâncias são $(G)$ onde:
- $G = (V, A)$ é um grafo composto de vertices($V$) e arrestas($A = (v_1, v_2)$).

O problema do clique é encontrar um clique máximo de um grafo.

---

#### Exemplo
TODO

---

### Problema de Decisão: K-Clique
Pelo clique originamente ser um problema de otimização teremos quue usar uma outra versão dele para provar sua NP-completude: o *K-Clique*.

O problema do K-Clique tem como instância $(G, k)$ onde:
- $G$ é um grafo da mesma forma que no clique.
- $k \in \mathbb N$.

O problema consiste em decidir se um grafo contém ao menos um clique de tamanho $k$ ou maior.


---
### Exemplo
TODO
---

## K-Clique é NP:
Para provar que K-clique é NP, mostrarei um algoritmo que válida uma solução se dado um certificado.

### Certificado do K-Clique
O certificado $C$ é o clique encontrado, e esse algoritmo verifica que ele realmente se encontra no grafo $G$ e é maior que $k$.

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
--- 

### Complexidade do Algoritmo
Pior caso: $k$ é igual ao numero de vertices de $C$, que chamaremos de $n$.
``` rust 
fn verifica_validade(G: Grafo, k: i32, C: Grafo) -> bool {
    if C.vert_count < k {return false} //O(1)
    
    for (vert in C.V) { // n * 
        if (!G.V.contains(vert)) return false; // O(n)
        
        for (other in C.V) { // n *
            if ( other == vert) continue; // O(1)
            if (!G.A.contains(vert,other)) return false; // O(n)
        }
    }
    
    return true;
}
```

$$O(n^3)$$
---

## K-Clique é NP-dificil
Prova que K-Clique é NP-dificil usando redução do CNF-3SAT.
---

O CNF-3SAT é um problema de decisão onde a instância é uma formula CNF de 3SAT.
Exemplo:
$$
\begin{align}
    (x_1 \lor x_2 \lor x_3) \land (x_1 \lor x_2 \lor x_4) \land (x_1 \lor x_3 \lor x_4) \land (x_2 \lor x_3 \lor x_4)
\end{align}
$$

Essa formula é satisfazível, pois podemos escolher $x_1 = x_2 = 1$.

Usaremos uma redução para provar que K-Clique é NP-dificil.

---

### Redução do CNF-3SAT para K-Clique

Considerando uma formula CNF de 3SAT($\phi$) de $n$ clausulas, na qual cada clausula é uma disjunção de 3 literais,
assim, cada clausula $C_i$ é uma disjunção de 3 literais $L_{1}^{i}, L_{2}^{i}, L_{3}^{i}$.
$$ C_i = (L_{i}^{1} \lor L_{i}^{2} \lor L_{i}^{3}) $$
$$ \phi = \bigwedge_{i=1}^{n} C_i $$

Constuiremos um grafo $G = (V, A)$ onde:
 - Para cada clausula $C_r$ da formula CNF, teremos uma tripla de vértices $v_{1}^{r}, v_{2}^{r}, v_{3}^{r}$.
 - Inserimos uma arresta entre dois vértices $v_{1}^{r}, v_{2}^{r}$ se, e somente se ambas as afirmativas forem verdadeiras:
    - $v_{i}^{r}$ e $v_{j}^{s}$ são vértices de clausulas diferentes. Ou seja, $r \neq s$;
    - $L_{i}^{r}$ e $L_{j}^{s}$ não são literais complementares. Ou seja, $L_{i}^{r} \neq \neg L_{j}^{s}$.

---

Seja $G = (V, A)$ o grafo construido, então:
 - Se G contem um clique de tamanho $n$, então $\phi$ é satisfazível;
 - Se G não contém um clique de tamanho $n$, então $\phi$ não é satisfazível.

---
clicks: 2
---
## Exemplo:
$$
\begin{align}
    (x_1 \lor x_2 \lor x_3) \land (x_1 \lor x_2 \lor x_4) \land (x_1 \lor x_3 \lor x_4) \land (x_2 \lor x_3 \lor x_4)
\end{align}
$$

<GrafoExSAT1 />

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
        grafo.add_vertice(clausula.l3);
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
    return grafo;
}
```

---

## Análise da complexidade do Algoritmo
