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

<Counter />
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
---