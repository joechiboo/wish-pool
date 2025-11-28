<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="pt-24 pb-16 px-4">
    <div class="max-w-3xl mx-auto">
      <!-- Hero Section -->
      <div class="text-center mb-12">
        <div class="text-6xl mb-4">🌟</div>
        <h1 class="text-3xl font-bold text-gray-800 mb-4">
          每個願望，都值得被看見
        </h1>
        <p class="text-lg text-gray-600 leading-relaxed">
          許願池是一個讓夢想與實現者相遇的地方
        </p>
      </div>

      <!-- Story Section -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div class="prose prose-lg max-w-none">
          <h2 class="flex items-center gap-3 text-xl font-bold text-gray-800 mb-4">
            <span>💭</span>
            <span>我們的故事</span>
          </h2>
          <p class="text-gray-600 leading-relaxed mb-6">
            有時候，我們心中有個想法、一個專案、一個夢想，卻不知道該找誰幫忙。
            而同時，有一群熱情的工程師，正在尋找有意義的事情來發揮所長。
          </p>
          <p class="text-gray-600 leading-relaxed mb-6">
            許願池就是這樣誕生的 —— 一個簡單的平台，讓需要幫助的人能夠許下心願，
            讓有能力的人能夠伸出援手。
          </p>
        </div>
      </div>

      <!-- How It Works -->
      <div class="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 mb-8">
        <h2 class="flex items-center gap-3 text-xl font-bold text-gray-800 mb-6">
          <span>✨</span>
          <span>如何運作？</span>
        </h2>

        <div class="space-y-6">
          <div class="flex gap-4">
            <div class="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
              1
            </div>
            <div>
              <h3 class="font-medium text-gray-800 mb-1">寫下你的願望</h3>
              <p class="text-gray-600 text-sm">
                描述你想要完成的事情，不管是網站、App、自動化工具，或是任何技術相關的需求
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
              2
            </div>
            <div>
              <h3 class="font-medium text-gray-800 mb-1">獲得祝福與媒合</h3>
              <p class="text-gray-600 text-sm">
                社群會為你的願望送上祝福，我們也會協助媒合適合的工程師
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
              3
            </div>
            <div>
              <h3 class="font-medium text-gray-800 mb-1">願望成真</h3>
              <p class="text-gray-600 text-sm">
                與工程師溝通需求、一起完成專案，讓想法變成現實
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Support Section (Subtle pricing) -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 class="flex items-center gap-3 text-xl font-bold text-gray-800 mb-4">
          <span>🤝</span>
          <span>支持願望成真</span>
        </h2>

        <p class="text-gray-600 leading-relaxed mb-6">
          為了維持平台運作，並確保每個願望都能得到用心的對待，
          我們採用「祝福金」的方式來支持媒合服務。
        </p>

        <div class="bg-amber-50 rounded-xl p-6 mb-6">
          <div class="flex items-start gap-3">
            <span class="text-2xl">🌱</span>
            <div>
              <h3 class="font-medium text-gray-800 mb-2">新手方案</h3>
              <p class="text-gray-600 text-sm mb-3">
                首次許願的朋友，前 10 小時的工作時數，每小時只需要 200 元的祝福金。
                這是為了讓更多人能夠輕鬆開始自己的第一個專案。
              </p>
              <p class="text-xs text-gray-500">
                *後續時數會依專案複雜度調整，我們會在媒合前詳細說明
              </p>
            </div>
          </div>
        </div>

        <div class="bg-purple-50 rounded-xl p-6">
          <div class="flex items-start gap-3">
            <span class="text-2xl">💜</span>
            <div>
              <h3 class="font-medium text-gray-800 mb-2">我們的承諾</h3>
              <ul class="text-gray-600 text-sm space-y-2">
                <li class="flex items-center gap-2">
                  <span class="text-purple-500">✓</span>
                  <span>專人審核每個願望，確保媒合品質</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-purple-500">✓</span>
                  <span>不滿意全額退費保證</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-purple-500">✓</span>
                  <span>持續陪伴直到願望成真</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Methods -->
      <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 mb-8">
        <h2 class="flex items-center gap-3 text-xl font-bold text-gray-800 mb-4">
          <span>💳</span>
          <span>付款方式</span>
        </h2>
        <p class="text-gray-600 text-sm mb-4">
          我們支援以下付款方式，讓你輕鬆完成祝福
        </p>
        <div class="flex flex-wrap gap-4">
          <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
              <span class="text-white text-xs font-bold">LINE</span>
            </div>
            <span class="text-gray-700 font-medium">LINE Pay</span>
          </div>
          <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm text-gray-400">
            <span class="text-sm">更多方式即將推出...</span>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center">
        <p class="text-gray-600 mb-6">
          準備好許下你的願望了嗎？
        </p>
        <RouterLink
          to="/wishes/create"
          class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-full hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
        >
          <span class="text-xl">✨</span>
          <span>開始許願</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
