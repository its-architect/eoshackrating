# DAR - Decentralized Autonomus Rating of IT Sphere
Rating system on EOS Hackathon

## WE HAVE AGREED THAT:
1. We consider each **programmer** as some **random value of η**, whose value is the **time of activity** of this programmer at the computer. Consequently, the **random variable η** uniquely determines its probability distribution function **F(x)** and is completely described by it.
2. But we do not have an analytical expression for the distribution function **ξ**, but only a sample of a finite volume from the set of its values, each of which is the **time of the active work of the programmer.**
3. **The time of active work** of each programmer is measured in the same time interval, equal to 10 minutes.
4. It is natural to assume that the programmer works **well** when the **random variable η**, characterizing the **time of its activity**, has a **normal distribution** with some parameters a and σ, or is a constant at all, i.e. not random. In other words, if the programmer is most likely to work with some average speed for him, this is good, and his **rating** should grow.
5. **The programmer's rating** is the measure of the stability of the programmer's work that we have introduced.

## HOW WE CALCULATE THE RATING (IN SIMPLE WORDS):
We introduce two random variables:
1. **η** (ETA) is a random value of the programmer's activity time, with an unknown distribution function, but with the known mathematical expectation **a = E (η)** and the root-mean-square deviation **σ = √ Var (η)**
2. **ξ** (CSI) is a normally distributed random variable obtained on the basis of the first quantity with the above parameters:
    * **a** (A) - its average value (in another - the mathematical expectation)
    * **σ** (SIGMA) - the standard deviation from the mean value (in another - the square root of the variance)

**The rating** is a modulus of the correlation coefficient between the quantities **ξ** and **ξ * η**, which characterizes the existence of a linear relationship between these random variables. The rating is 1 if there is a linear relationship between the two quantities, and this is the ideal job of the programmer with a constantly perfect quality (active time). In practice, for an "ideal" programmer, it will only tend to 1. And for a "bad" programmer, it will tend to zero.
The rating can take any real values ​​from 0 to 1. But for visualization, we multiply it by 100% and limit it to 2 numbers after the decimal point.

## MORE DETAILS ABOUT RANDOM VALUES AND CORRELATION COEFFICIENT:
**η** (ETA) is the random value of the programmer's (activity) time. It uniquely determines its distribution function, but it is not known in advance, and we are looking for it. More precisely, we want to estimate how strongly **η** is constant or similar to the normal distribution function with parameters:
1) **a** - mathematical expectation **η** (it characterizes the **average value of the number of seconds of active mouse and keyboard clicks**)
2) **σ** is the standard deviation **η** (the measure of the **deviation of the random activity η from its average value a**)

For these two parameters, we can define the distribution function of a new, normally distributed random variable - **ξ** (CSI). It will have the same mathematical expectation and the same standard deviation as in **η** (ETA) - a random amount of the programmer's work. Constructing the distribution function **ξ**, we find the correlation coefficient between **ξ** and the product **ξ** by η and thereby calculate the rating.

In other words, our task of calculating the rating is to find a linear dependencies (correlation) between **ξ** (CSI) (normally distributed random variable) and its product by **η** (ETA) (random value of the programmer's activity).

In this case, the rating is the correlation coefficient taken modulo, or the absolute measure of linear dependence.

The product of **η** by **ξ** is taken from empirical considerations, after studies on the determination of the correlation with other random variables. What gave us a **more stable rating**.
