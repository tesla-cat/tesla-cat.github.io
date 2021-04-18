
# Encoding innate ability through a genomic bottleneck

- [pdf](https://www.biorxiv.org/content/10.1101/2021.03.16.435261v1.full.pdf)

# Introduction

- C. elegans genome: $`10^8`$ base pairs => $`2 \times 10^8`$ bits capacity
    - 302 neurons => $`302^2`$ connection matrix => $`9 \times 10^4`$ bits required
- human genome: $`10^9`$ bits capacity
    - $`10^{10}`$ neurons => $`10^{15}`$ bits required

- Thus, the genome specifies **rules** instead
    - Example: "connect to your four nearest neighbors"
    - rules based on the **cell surface markers** (Sperry, 1963; Zipursky and Sanes, 2010; Wei et al., 2013)
    - Complex structures such as orientation columns in the visual cortex can be induced to self-organize from simple use-dependent rules (Von der Malsburg, 1973)
- However, above are not applicable to complex networks

- For ANNs, we seek to compress the weight matrix into a much smaller "genome"

# Implementation of the Genomic Bottleneck

- trained network = phenotype 表型 network = p-network
- use a genomic (g-network) to generate p-network 
- input to g-network: a pair of neurons, output: connection strength
- inspired by neurodevelopmental rules based on local pair-wise interactions between neurons (Sperry, 1963; Zipursky and Sanes, 2010), not a realistic model of **neural development** (Stanley et al., 2009; Barabási and Barabási, 2020)
- use SGD (Ha et al., 2016) rather than evolutionary algorithms (Stanley et al., 2009, 2019) to achieve end-to-end optimization of both g and p
- represent each neuron in the p-network by a unique binary label
    - Each binary **digit** in this label is indicator of a **molecular tag**
    - N neurons => $`log_2(N)`$ binary digits
- Connectivity is effectively guided by interactions of pairs of molecules expressed on the pre- and postsynaptic membranes
