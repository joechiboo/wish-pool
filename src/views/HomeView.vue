<script setup lang="ts">
import WishPool from '@/components/WishPool.vue'
</script>

<template>
  <div class="home-page">
    <!-- Full screen wish pool -->
    <section class="pool-section">
      <WishPool />
    </section>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  background: linear-gradient(180deg,
    #0f0a1e 0%,
    #1a1033 30%,
    #2d1b4e 60%,
    #1a1033 100%
  );
  position: relative;
  overflow: hidden;
}

/* Starry background */
.home-page::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(2px 2px at 20px 30px, white, transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 90px 40px, white, transparent),
    radial-gradient(2px 2px at 160px 120px, rgba(255,255,255,0.9), transparent),
    radial-gradient(1px 1px at 230px 80px, white, transparent),
    radial-gradient(2px 2px at 300px 150px, rgba(255,255,255,0.7), transparent),
    radial-gradient(1px 1px at 350px 200px, white, transparent),
    radial-gradient(2px 2px at 420px 50px, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 500px 180px, white, transparent),
    radial-gradient(2px 2px at 580px 100px, rgba(255,255,255,0.9), transparent),
    radial-gradient(1px 1px at 650px 220px, white, transparent),
    radial-gradient(2px 2px at 720px 60px, rgba(255,255,255,0.7), transparent),
    radial-gradient(1px 1px at 800px 140px, white, transparent),
    radial-gradient(2px 2px at 880px 200px, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 950px 90px, white, transparent),
    radial-gradient(2px 2px at 100px 300px, rgba(255,255,255,0.9), transparent),
    radial-gradient(1px 1px at 200px 350px, white, transparent),
    radial-gradient(2px 2px at 300px 400px, rgba(255,255,255,0.7), transparent),
    radial-gradient(1px 1px at 400px 320px, white, transparent),
    radial-gradient(2px 2px at 500px 380px, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 600px 450px, white, transparent),
    radial-gradient(2px 2px at 700px 340px, rgba(255,255,255,0.9), transparent),
    radial-gradient(1px 1px at 800px 420px, white, transparent),
    radial-gradient(2px 2px at 900px 360px, rgba(255,255,255,0.7), transparent);
  background-size: 1000px 500px;
  animation: twinkle 8s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes twinkle {
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.pool-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
</style>
