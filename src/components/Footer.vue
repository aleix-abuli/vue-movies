<script setup></script>

<template>
  <footer>
    <RouterLink to="/" class="footer-logo"
      ><span>S</span>B<span>.</span></RouterLink
    >
    <p>Coded by Aleix Abulí.</p>
    <div class="footer-flex">
      <a href="https://github.com/aleix-abuli" target="_blank"
        ><img src="/github.png" alt=""
      /></a>
      <a href="https://www.linkedin.com/in/aleix-abuli/" target="_blank"
        ><img src="/linkedin.png" alt=""
      /></a>
    </div>
  </footer>
</template>

<style>
footer {
  width: 100%;
  height: 7vh;
  background-color: var(--black);
  position: sticky;
  bottom: 0;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 6rem;
  margin-top: 4rem;
}

.footer-logo {
  font-size: 2.5rem;
  color: var(--white);
}

.footer-logo span {
  font-size: 2.5rem;
  color: var(--yellow);
  font-weight: 800;
}

footer p {
  font-size: 1.5rem;
}

.footer-flex {
  display: flex;
  gap: 1rem;
}

.footer-flex img {
  width: 2rem;
}

footer p {
  color: var(--white);
}

@media screen and (max-width: 768px) {
  footer {
    padding: 1rem 3rem;
  }
}

@media screen and (max-width: 360px) {
  .footer-logo {
    display: none;
  }
}
</style>
