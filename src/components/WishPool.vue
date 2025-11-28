<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isHovering = ref(false)
const coins = ref<{ id: number; x: number; delay: number; duration: number }[]>([])
const particles = ref<{ id: number; x: number; y: number; size: number }[]>([])
const overflowCoins = ref<{ id: number; x: number; y: number; delay: number }[]>([])
const blessingCount = ref(0)
const poolLevel = ref(0) // 0-4 levels

let coinId = 0
let particleId = 0
let overflowId = 0
let coinInterval: ReturnType<typeof setInterval> | null = null
let particleInterval: ReturnType<typeof setInterval> | null = null
let blessingInterval: ReturnType<typeof setInterval> | null = null

// Level thresholds
const LEVEL_THRESHOLDS = [0, 15, 35, 60, 100]
const LEVEL_MESSAGES = ['', '祝福湧入中...', '金幣累積中...', '即將滿溢...', '祝福滿溢！']

const currentMessage = computed(() => LEVEL_MESSAGES[poolLevel.value])

function updatePoolLevel() {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (blessingCount.value >= LEVEL_THRESHOLDS[i]) {
      poolLevel.value = i
      break
    }
  }
}

function startCoinAnimation() {
  if (coinInterval) return

  // Generate coins when hovering
  coinInterval = setInterval(() => {
    if (isHovering.value && coins.value.length < 25) {
      coins.value.push({
        id: coinId++,
        x: 15 + Math.random() * 70,
        delay: Math.random() * 0.15,
        duration: 1 + Math.random() * 0.5
      })
    }
  }, 100)

  // Count blessings
  blessingInterval = setInterval(() => {
    if (isHovering.value) {
      blessingCount.value++
      updatePoolLevel()

      // Generate overflow coins at level 4
      if (poolLevel.value >= 4 && overflowCoins.value.length < 12) {
        createOverflowCoin()
      }
      // Start generating some overflow at level 3
      if (poolLevel.value === 3 && Math.random() > 0.7 && overflowCoins.value.length < 5) {
        createOverflowCoin()
      }
    }
  }, 100)
}

function createOverflowCoin() {
  const angle = Math.random() * Math.PI * 2 // radians
  const distance = 180 + Math.random() * 120 // pixels
  overflowCoins.value.push({
    id: overflowId++,
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    delay: Math.random() * 0.2
  })
}

function stopCoinAnimation() {
  if (coinInterval) {
    clearInterval(coinInterval)
    coinInterval = null
  }
  if (blessingInterval) {
    clearInterval(blessingInterval)
    blessingInterval = null
  }
}

function removeCoin(id: number) {
  coins.value = coins.value.filter(c => c.id !== id)
}

function removeOverflowCoin(id: number) {
  overflowCoins.value = overflowCoins.value.filter(c => c.id !== id)
}

function createAmbientParticles() {
  particleInterval = setInterval(() => {
    if (particles.value.length < 30) {
      particles.value.push({
        id: particleId++,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 3 + Math.random() * 6
      })
    }
  }, 400)
}

function removeParticle(id: number) {
  particles.value = particles.value.filter(p => p.id !== id)
}

function handleMouseEnter() {
  isHovering.value = true
  startCoinAnimation()
}

function handleMouseLeave() {
  isHovering.value = false
  stopCoinAnimation()
  // Gradually decrease level when not hovering
  const decayInterval = setInterval(() => {
    if (!isHovering.value && blessingCount.value > 0) {
      blessingCount.value = Math.max(0, blessingCount.value - 2)
      updatePoolLevel()
    } else {
      clearInterval(decayInterval)
    }
  }, 100)
}

function handlePoolClick() {
  router.push('/wishes/create')
}

onMounted(() => {
  createAmbientParticles()
})

onUnmounted(() => {
  stopCoinAnimation()
  if (particleInterval) {
    clearInterval(particleInterval)
  }
})
</script>

<template>
  <div
    class="wish-pool-container"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handlePoolClick"
  >
    <!-- Background glow effect -->
    <div class="pool-glow" :class="{ 'pool-glow-active': isHovering }"></div>

    <!-- Ambient particles -->
    <div
      v-for="particle in particles"
      :key="particle.id"
      class="ambient-particle"
      :style="{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        width: `${particle.size}px`,
        height: `${particle.size}px`
      }"
      @animationend="removeParticle(particle.id)"
    ></div>

    <!-- The wish pool -->
    <div class="pool-wrapper">
      <!-- Pool outer ring -->
      <div class="pool-ring pool-ring-outer"></div>
      <div class="pool-ring pool-ring-middle"></div>
      <div class="pool-ring pool-ring-inner"></div>

      <!-- Pool water surface -->
      <div class="pool-surface" :class="{ 'pool-surface-active': isHovering }">
        <!-- Ripple effects -->
        <div class="ripple ripple-1"></div>
        <div class="ripple ripple-2"></div>
        <div class="ripple ripple-3"></div>

        <!-- Center star (CSS drawn) -->
        <div class="pool-center-star" :class="{ 'star-active': isHovering }">
          <div class="star-shape"></div>
        </div>

        <!-- Floating wishes text -->
        <div class="floating-text">許願池</div>
      </div>

      <!-- Falling coins (CSS drawn) -->
      <div
        v-for="coin in coins"
        :key="coin.id"
        class="falling-coin"
        :style="{
          left: `${coin.x}%`,
          animationDelay: `${coin.delay}s`,
          animationDuration: `${coin.duration}s`
        }"
        @animationend="removeCoin(coin.id)"
      >
        <div class="coin-inner"></div>
      </div>
    </div>

    <!-- Splash effects when coins land -->
    <div class="splash-container">
      <div
        v-for="coin in coins"
        :key="`splash-${coin.id}`"
        class="splash"
        :style="{
          left: `${coin.x}%`,
          animationDelay: `${coin.delay + coin.duration - 0.1}s`
        }"
      ></div>
    </div>

    <!-- Overflow coins flying out -->
    <div
      v-for="coin in overflowCoins"
      :key="`overflow-${coin.id}`"
      class="overflow-coin"
      :style="{
        '--tx': `${coin.x}px`,
        '--ty': `${coin.y}px`,
        animationDelay: `${coin.delay}s`
      }"
      @animationend="removeOverflowCoin(coin.id)"
    >
      <div class="coin-inner"></div>
    </div>

    <!-- Pool fill level indicator -->
    <div class="pool-fill" :class="`pool-fill-level-${poolLevel}`"></div>

    <!-- Level progress bar -->
    <div class="level-bar" :class="{ 'level-bar-active': isHovering }">
      <div class="level-fill" :style="{ width: `${Math.min(blessingCount, 100)}%` }"></div>
      <div class="level-markers">
        <div v-for="i in 4" :key="i" class="level-marker" :class="{ 'marker-reached': poolLevel >= i }"></div>
      </div>
    </div>

    <!-- Instruction text -->
    <div class="hover-instruction" :class="{ 'instruction-hidden': isHovering }">
      <span class="instruction-text">點擊許願池開始許願</span>
    </div>

    <!-- Wish count display -->
    <div class="wish-count" :class="{ 'count-active': isHovering }">
      <div class="sparkle"></div>
      <span class="count-text">{{ currentMessage || '投入祝福' }}</span>
    </div>

    <!-- Overflow effect burst -->
    <div v-if="poolLevel >= 4" class="overflow-burst"></div>
  </div>
</template>

<style scoped>
.wish-pool-container {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
}

/* Pool glow background */
.pool-glow {
  position: absolute;
  width: min(90vw, 900px);
  height: min(90vw, 900px);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%);
  filter: blur(80px);
  transition: all 0.5s ease;
}

.pool-glow-active {
  background: radial-gradient(circle, rgba(251, 191, 36, 0.5) 0%, rgba(139, 92, 246, 0.4) 50%, transparent 70%);
  transform: scale(1.3);
}

/* Pool wrapper - much larger now */
.pool-wrapper {
  position: relative;
  width: min(70vw, 550px);
  height: min(70vw, 550px);
}

/* Pool rings */
.pool-ring {
  position: absolute;
  border-radius: 50%;
  border: 4px solid;
  animation: ring-pulse 3s ease-in-out infinite;
}

.pool-ring-outer {
  inset: 0;
  border-color: rgba(139, 92, 246, 0.3);
  animation-delay: 0s;
}

.pool-ring-middle {
  inset: 20px;
  border-color: rgba(139, 92, 246, 0.4);
  animation-delay: 0.5s;
}

.pool-ring-inner {
  inset: 40px;
  border-color: rgba(139, 92, 246, 0.5);
  animation-delay: 1s;
}

@keyframes ring-pulse {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.02);
  }
}

/* Pool surface */
.pool-surface {
  position: absolute;
  inset: 55px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%,
    rgba(96, 165, 250, 0.8) 0%,
    rgba(139, 92, 246, 0.9) 50%,
    rgba(88, 28, 135, 0.95) 100%
  );
  box-shadow:
    inset 0 0 80px rgba(255, 255, 255, 0.2),
    0 0 60px rgba(139, 92, 246, 0.5),
    0 30px 80px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: all 0.5s ease;
}

.pool-surface-active {
  background: radial-gradient(circle at 30% 30%,
    rgba(251, 191, 36, 0.6) 0%,
    rgba(96, 165, 250, 0.8) 30%,
    rgba(139, 92, 246, 0.9) 60%,
    rgba(88, 28, 135, 0.95) 100%
  );
  box-shadow:
    inset 0 0 100px rgba(251, 191, 36, 0.3),
    0 0 80px rgba(251, 191, 36, 0.5),
    0 30px 80px rgba(0, 0, 0, 0.3);
}

/* Ripple effects */
.ripple {
  position: absolute;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  animation: ripple-expand 4s ease-out infinite;
}

.ripple-1 {
  width: 60%;
  height: 60%;
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.ripple-2 {
  width: 40%;
  height: 40%;
  top: 30%;
  left: 30%;
  animation-delay: 1.3s;
}

.ripple-3 {
  width: 80%;
  height: 80%;
  top: 10%;
  left: 10%;
  animation-delay: 2.6s;
}

@keyframes ripple-expand {
  0% {
    transform: scale(0.5);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

/* Center star - CSS drawn */
.pool-center-star {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: star-float 3s ease-in-out infinite;
  transition: all 0.3s ease;
}

.star-shape {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #fcd34d 0%, #fbbf24 50%, #f59e0b 100%);
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  filter: drop-shadow(0 0 20px rgba(251, 191, 36, 0.8));
}

.star-active .star-shape {
  width: 100px;
  height: 100px;
  filter: drop-shadow(0 0 40px rgba(251, 191, 36, 1));
}

@keyframes star-float {
  0%, 100% {
    transform: translate(-50%, -50%) translateY(0);
  }
  50% {
    transform: translate(-50%, -50%) translateY(-15px);
  }
}

.star-active {
  animation: star-float-active 1.5s ease-in-out infinite;
}

@keyframes star-float-active {
  0%, 100% {
    transform: translate(-50%, -50%) translateY(0) scale(1.1);
  }
  50% {
    transform: translate(-50%, -50%) translateY(-20px) scale(1.2);
  }
}

/* Floating text */
.floating-text {
  position: absolute;
  bottom: 22%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.8rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 2px 15px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.3em;
}

/* Falling coins - CSS drawn */
.falling-coin {
  position: absolute;
  top: -50px;
  width: 28px;
  height: 28px;
  animation: coin-fall linear forwards;
  z-index: 10;
}

.coin-inner {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #fcd34d 0%, #fbbf24 40%, #d97706 100%);
  border-radius: 50%;
  border: 3px solid #b45309;
  box-shadow:
    inset -3px -3px 6px rgba(0, 0, 0, 0.3),
    inset 3px 3px 6px rgba(255, 255, 255, 0.4),
    0 0 15px rgba(251, 191, 36, 0.8);
}

@keyframes coin-fall {
  0% {
    transform: translateY(0) rotateX(0deg) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateY(150px) rotateX(360deg) scale(0.9);
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    transform: translateY(320px) rotateX(720deg) scale(0.7);
    opacity: 0;
  }
}

/* Splash effects */
.splash-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(70vw, 550px);
  height: min(70vw, 550px);
  pointer-events: none;
}

.splash {
  position: absolute;
  top: 58%;
  width: 30px;
  height: 30px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(251, 191, 36, 0.5) 50%, transparent 70%);
  border-radius: 50%;
  animation: splash-effect 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes splash-effect {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

/* Ambient particles */
.ambient-particle {
  position: absolute;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.9) 0%, transparent 70%);
  border-radius: 50%;
  animation: particle-float 6s ease-in-out forwards;
  pointer-events: none;
}

@keyframes particle-float {
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
    transform: translateY(-80px);
  }
}

/* Hover instruction */
.hover-instruction {
  position: absolute;
  bottom: 8%;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.3s ease;
  animation: instruction-pulse 2s ease-in-out infinite;
}

.instruction-text {
  font-size: 1.1rem;
  color: rgba(253, 224, 71, 0.9);
  text-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
  letter-spacing: 0.1em;
}

.instruction-hidden {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

@keyframes instruction-pulse {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

/* Wish count display */
.wish-count {
  position: absolute;
  top: 12%;
  left: 50%;
  transform: translateX(-50%) translateY(-20px);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  opacity: 0;
  transition: all 0.5s ease;
}

.sparkle {
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #fcd34d 0%, #fbbf24 100%);
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  animation: sparkle-spin 2s linear infinite;
}

@keyframes sparkle-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.count-active {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.count-text {
  font-weight: bold;
  background: linear-gradient(90deg, #fcd34d, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: none;
}

/* Pool fill levels */
.pool-fill {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(70vw, 550px);
  height: min(70vw, 550px);
  border-radius: 50%;
  pointer-events: none;
  transition: all 0.5s ease;
}

.pool-fill-level-1 {
  box-shadow: inset 0 0 60px rgba(251, 191, 36, 0.2);
}

.pool-fill-level-2 {
  box-shadow: inset 0 0 80px rgba(251, 191, 36, 0.35);
}

.pool-fill-level-3 {
  box-shadow: inset 0 0 100px rgba(251, 191, 36, 0.5);
  animation: pool-pulse 1s ease-in-out infinite;
}

.pool-fill-level-4 {
  box-shadow:
    inset 0 0 120px rgba(251, 191, 36, 0.6),
    0 0 60px rgba(251, 191, 36, 0.4);
  animation: pool-overflow 0.5s ease-in-out infinite;
}

@keyframes pool-pulse {
  0%, 100% {
    box-shadow: inset 0 0 100px rgba(251, 191, 36, 0.5);
  }
  50% {
    box-shadow: inset 0 0 120px rgba(251, 191, 36, 0.6);
  }
}

@keyframes pool-overflow {
  0%, 100% {
    box-shadow:
      inset 0 0 120px rgba(251, 191, 36, 0.6),
      0 0 60px rgba(251, 191, 36, 0.4);
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    box-shadow:
      inset 0 0 140px rgba(251, 191, 36, 0.7),
      0 0 80px rgba(251, 191, 36, 0.5);
    transform: translate(-50%, -50%) scale(1.02);
  }
}

/* Overflow coins flying out */
.overflow-coin {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 24px;
  height: 24px;
  transform: translate(-50%, -50%);
  animation: coin-overflow 1.5s ease-out forwards;
  z-index: 20;
}

@keyframes coin-overflow {
  0% {
    transform: translate(-50%, -50%) translate(0, 0) rotate(0deg);
    opacity: 1;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) rotate(720deg);
    opacity: 0;
  }
}

/* Level progress bar */
.level-bar {
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  opacity: 0;
  transition: all 0.3s ease;
}

.level-bar-active {
  opacity: 1;
}

.level-fill {
  height: 100%;
  background: linear-gradient(90deg, #fbbf24, #f59e0b, #ef4444);
  border-radius: 4px;
  transition: width 0.1s ease;
}

.level-markers {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 14%;
}

.level-marker {
  width: 3px;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.marker-reached {
  background: #fbbf24;
  box-shadow: 0 0 8px rgba(251, 191, 36, 0.8);
}

/* Overflow burst effect */
.overflow-burst {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(90vw, 700px);
  height: min(90vw, 700px);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 60%);
  animation: burst-pulse 0.8s ease-in-out infinite;
  pointer-events: none;
}

@keyframes burst-pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.8;
  }
}

/* Responsive */
@media (max-width: 640px) {
  .pool-wrapper {
    width: 85vw;
    height: 85vw;
  }

  .pool-glow {
    width: 100vw;
    height: 100vw;
  }

  .pool-fill {
    width: 85vw;
    height: 85vw;
  }

  .star-shape {
    width: 60px;
    height: 60px;
  }

  .star-active .star-shape {
    width: 75px;
    height: 75px;
  }

  .floating-text {
    font-size: 1.4rem;
  }

  .falling-coin {
    width: 22px;
    height: 22px;
  }

  .overflow-coin {
    width: 18px;
    height: 18px;
  }

  .instruction-text {
    font-size: 0.95rem;
  }

  .count-text {
    font-size: 1.2rem;
  }

  .level-bar {
    width: 160px;
    bottom: 12%;
  }

  .overflow-burst {
    width: 100vw;
    height: 100vw;
  }
}
</style>
