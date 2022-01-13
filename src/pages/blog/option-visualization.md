---
setup: |
  import CodeBlock from '../../components/CodeBlock.astro';
layout: ../../layouts/BlogPost.astro
title: Visualizations of Important Concepts in Option Pricing
date: January 11, 2022
descriptions: Some visualizations of some concepts in option pricing like Geometric Brownian Motion, Binomial Trees, and the Greeks.
---
<style>
  code {
    white-space: pre;
  }
</style>

<CodeBlock>
  <code>
    interest_rate = 0.05 
    strike = 90
  </code>
</CodeBlock>

## Generating Sample Paths of Stock Price Process

### Geometric Brownian Motion

$$
dX_t = \mu X_t dt +\sigma X_t dW_t
$$

The solution is 
$$ 
X_t = X_0 \exp\left(\left[\mu - \frac{1}{2}\sigma^2\right]t + \sigma W_t \right)
$$


<CodeBlock>
  <code>
    gbm1 = options.GeometricBrownianMotion(0, 0.1, 100)
    gbm1.plot_sample_paths(1000, 100, alpha = 0.05, ax = axs[0])
    gbm1.plot_sample_paths(1000, 10, alpha = 0.05, ax = axs[1])
  </code>
</CodeBlock>

<img src="/assets/option-viz-figs/gbm_steps.png" alt="Sample paths of Geometric Brownian Motion" width=100%/>

<CodeBlock>
  <code>
    gbm2 = options.GeometricBrownianMotion(0, 0.5, 100)
    gbm1.plot_sample_paths(1000, 100, alpha = 0.05, ax = axs[0])
    gbm2.plot_sample_paths(1000, 100, alpha = 0.05, ax = axs[1])
  </code>
</CodeBlock>

<CodeBlock>
  <code>
    gbm3 = options.GeometricBrownianMotion(1, 0.1, 100)
    gbm1.plot_sample_paths(1000, 100, alpha = 0.05, ax = axs[0])
    gbm3.plot_sample_paths(1000, 100, alpha = 0.05, ax = axs[1])
  </code>
</CodeBlock>

### Binomial Trees

<CodeBlock>
  <code>
    bin_tree1 = options.BinomialTree(0.1, 100, 100)
    q1 = (np.exp(interest_rate * bin_tree1.delta_t) - bin_tree1.d)/(bin_tree1.u - bin_tree1.d)
    bin_tree1.plot_sample_paths(q1, 500, ax = axs[0])
    bin_tree2 = options.BinomialTree(0.1, 100, 10)
    q2 = (np.exp(interest_rate * bin_tree2.delta_t) -  bin_tree2.d)/(bin_tree2.u - bin_tree2.d)
    bin_tree2.plot_sample_paths(q2, 500, ax = axs[1])
  </code>
</CodeBlock>
<CodeBlock>
  <code>
    bin_tree1.plot_sample_paths(q1, 500, ax = axs[0])
    bin_tree3 = options.BinomialTree(0.5, 100, 100)
    q3 = (np.exp(interest_rate * bin_tree3.delta_t) - bin_tree3.d)/(bin_tree3.u - bin_tree3.d)
    bin_tree3.plot_sample_paths(q3, 500, ax = axs[1])
  </code>
</CodeBlock>

### Trinomial Tree

<CodeBlock>
  <code>
    tri_tree1 = options.TrinomialTree(0.1, 100, 50, interest_rate)
    tri_tree1.plot_sample_paths(1000, ax = axs[0])
    tri_tree2 = options.TrinomialTree(0.1, 100, 10, interest_rate)
    tri_tree2.plot_sample_paths(1000, ax = axs[1])
  </code>
</CodeBlock>

<CodeBlock>
  <code>
    tri_tree1.plot_sample_paths(1000, ax = axs[0])
    tri_tree3 = options.TrinomialTree(0.5, 100, 50, interest_rate)
    tri_tree3.plot_sample_paths(1000, ax = axs[1])
  </code>
</CodeBlock>

## Option Pricing

## Generic Option Class

### Lookback Options

<CodeBlock>
  <code>
    def LookbackValue(S, K, c):
        return np.maximum(np.max(S) - K, 0) * c + np.maximum(K - np.min(S), 0) * (1 - c)
    LookBackCall = options.Option(gbm1, strike, interest_rate, 1, LookbackValue)
    LookBackPut = options.Option(gbm1, strike, interest_rate, 0, LookbackValue)
  </code>
</CodeBlock>


<CodeBlock>
  <code>
    mc_lbc = LookBackCall.get_monte_carlo_simulation(100, 1000)
    mc_lbp = LookBackPut.get_monte_carlo_simulation(100, 1000)
  </code>
</CodeBlock>

<CodeBlock>
  <code>
    plt.hist(mc_lbc, bins = 20, density = True)
    plt.hist(mc_lbp, bins = 20, density = True)
  </code>
</CodeBlock>

### Asian Options


<CodeBlock>
  <code>
    AsianFixedCall = options.AsianOption(gbm1, strike, interest_rate, 1, 0)
    AsianFloatingCall = options.AsianOption(gbm1, strike, interest_rate, 1, 1)
    AsianFixedPut = options.AsianOption(gbm1, strike, interest_rate, 0, 0)
    AsianFloatingPut = options.AsianOption(gbm1, strike, interest_rate, 0, 1)
  </code>
</CodeBlock>

<CodeBlock>
  <code>
    mc_axc = AsianFixedCall.get_monte_carlo_simulation(100,1000)
    mc_afc = AsianFloatingCall.get_monte_carlo_simulation(100, 1000)
    mc_axp = AsianFixedPut.get_monte_carlo_simulation(100, 1000)
    mc_afp = AsianFloatingPut.get_monte_carlo_simulation(100, 1000)
  </code>
</CodeBlock>


<CodeBlock>
  <code>
    plt.hist(mc_axc, bins = 20, density = True)
    plt.hist(mc_afc, bins = 20, density = True)
    plt.hist(mc_axp, bins = 20, density = True)
    plt.hist(mc_afp, bins = 20, density = True)
  </code>
</CodeBlock>


## European Options


<CodeBlock>
  <code>
    EuropeanCall = options.EuropeanOption(gbm1, strike, interest_rate, 1)
    EuropeanPut = options.EuropeanOption(gbm1, strike, interest_rate, 0)
  </code>
</CodeBlock>



<CodeBlock>
  <code>
    EuropeanCall.get_pricing_surface(50, 150, ax1)
    EuropeanPut.get_pricing_surface(50, 150, ax2)
    ax2.view_init(azim = 120)
  </code>
</CodeBlock>

### The Greeks


<CodeBlock>
  <code class="language-python">
    EuropeanCall.get_Delta_surface(50, 150, ax1)
    EuropeanPut.get_Delta_surface(50, 150, ax2)
  </code>
</CodeBlock>

Does this break it up???

<CodeBlock>
  <code>
    EuropeanCall.get_Gamma_surface(85, 95, ax1)
    EuropeanPut.get_Gamma_surface(85, 95, ax2)
  </code>
</CodeBlock>

<CodeBlock>
  <code>
    EuropeanCall.get_Theta_surface(70, 100, ax1)
    EuropeanPut.get_Theta_surface(70, 100, ax2)
  </code>
</CodeBlock>

<CodeBlock>
  <code>
    EuropeanCall.get_Vega_surface(60, 110, ax1)
    EuropeanPut.get_Vega_surface(60, 110, ax2)
  </code>
</CodeBlock>

<CodeBlock>
  <code>
    EuropeanCall.get_rho_surface(50, 150, ax1)
    EuropeanPut.get_rho_surface(10, 150, ax2)
  </code>
</CodeBlock>
