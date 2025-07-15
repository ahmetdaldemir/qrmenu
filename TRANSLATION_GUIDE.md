# Çeviri Sistemi Kullanım Kılavuzu

Bu proje, çok dilli destek için geliştirilmiş bir çeviri sistemi kullanmaktadır. Sistem, 5 farklı dili destekler: Türkçe, İngilizce, Rusça, Almanca ve Arapça.

## Desteklenen Diller

| Dil ID | Dil Kodu | Dil Adı |
|--------|----------|---------|
| 1 | tr | Türkçe |
| 2 | en | İngilizce |
| 3 | ru | Rusça |
| 4 | de | Almanca |
| 5 | ar | Arapça |

## Kullanım

### 1. Composable'ı Import Etme

```typescript
import { useTranslation } from '../composables/useTranslation'

// Component içinde
const { t, currentLang, setLanguage } = useTranslation()
```

### 2. Çeviri Fonksiyonu

```typescript
// Basit çeviri
const message = t('reservation.fullName') // "Ad Soyad" veya "Full Name"

// Parametreli çeviri
const errorMessage = t('reservation.phoneError', {
  country: 'Türkiye',
  length: 10
}) // "Türkiye için 10 haneli telefon giriniz."
```

### 3. Dil Değiştirme

```typescript
// Dil değiştirme
setLanguage('2') // İngilizce'ye geç
setLanguage('3') // Rusça'ya geç
```

### 4. Mevcut Dil Bilgisi

```typescript
// Mevcut dil ID'si
console.log(currentLang.value) // "1", "2", "3", "4", "5"

// Dil kodu
console.log(langCode.value) // "tr", "en", "ru", "de", "ar"
```

## Çeviri Anahtarları

### Rezervasyon Formu

| Anahtar | Açıklama |
|---------|----------|
| `reservation.banner` | Form üstündeki açıklama metni |
| `reservation.selectPackage` | Paket seçimi başlığı |
| `reservation.selectMenu` | Menü seçimi başlığı |
| `reservation.fullName` | Ad Soyad alanı |
| `reservation.email` | Email alanı |
| `reservation.phone` | Telefon alanı |
| `reservation.hotelName` | Otel adı alanı |
| `reservation.room` | Oda alanı |
| `reservation.date` | Tarih alanı |
| `reservation.selectDate` | Tarih seçimi placeholder |
| `reservation.adult` | Yetişkin seçimi |
| `reservation.child` | Çocuk seçimi |
| `reservation.continueAndCalculate` | Devam ve hesapla butonu |
| `reservation.calculating` | Hesaplanıyor mesajı |
| `reservation.paymentInfo` | Ödeme bilgileri başlığı |
| `reservation.reservationSummary` | Rezervasyon özeti başlığı |
| `reservation.hotel` | Otel etiketi |
| `reservation.roomLabel` | Oda etiketi |
| `reservation.dateLabel` | Tarih etiketi |
| `reservation.personCount` | Kişi sayısı etiketi |
| `reservation.totalAmount` | Toplam tutar etiketi |
| `reservation.cardNumber` | Kart numarası alanı |
| `reservation.cardHolder` | Kart sahibi alanı |
| `reservation.expiryMonth` | Son kullanma ay |
| `reservation.expiryYear` | Son kullanma yıl |
| `reservation.cvv` | CVV alanı |
| `reservation.completePayment` | Ödemeyi tamamla butonu |
| `reservation.processing` | İşleniyor mesajı |
| `reservation.privacy` | Gizlilik metni |
| `reservation.searchCountry` | Ülke arama placeholder |
| `reservation.phoneError` | Telefon hata mesajı |
| `reservation.calculationError` | Hesaplama hata mesajı |
| `reservation.packageError` | Paket yükleme hata mesajı |
| `reservation.paymentError` | Ödeme hata mesajı |
| `reservation.success` | Başarı mesajı |
| `reservation.paymentSuccess` | Ödeme başarı mesajı |

## Yeni Çeviri Ekleme

### 1. Composable'a Çeviri Ekleme

`src/composables/useTranslation.ts` dosyasındaki `translations` objesine yeni çeviriler ekleyin:

```typescript
const translations = {
  tr: {
    // ... mevcut çeviriler
    newSection: {
      newKey: "Yeni Türkçe metin"
    }
  },
  en: {
    // ... mevcut çeviriler
    newSection: {
      newKey: "New English text"
    }
  }
  // ... diğer diller
}
```

### 2. Component'te Kullanma

```vue
<template>
  <div>{{ t('newSection.newKey') }}</div>
</template>

<script setup>
import { useTranslation } from '../composables/useTranslation'
const { t } = useTranslation()
</script>
```

## Parametreli Çeviriler

Çeviri metinlerinde `{parametre}` formatında parametreler kullanabilirsiniz:

```typescript
// Çeviri metni: "Merhaba {name}, yaşınız {age}"
const message = t('greeting', { name: 'Ahmet', age: 25 })
// Sonuç: "Merhaba Ahmet, yaşınız 25"
```

## LocalStorage Entegrasyonu

Sistem otomatik olarak seçilen dili localStorage'da saklar ve sayfa yenilendiğinde korur. Dil değişikliği `langId` anahtarı ile saklanır.

## Örnek Kullanım

```vue
<template>
  <div>
    <h1>{{ t('reservation.paymentInfo') }}</h1>
    <p>{{ t('reservation.banner') }}</p>
    
    <label>{{ t('reservation.fullName') }}</label>
    <input :placeholder="t('reservation.fullName')" />
    
    <button>{{ t('reservation.continueAndCalculate') }}</button>
  </div>
</template>

<script setup>
import { useTranslation } from '../composables/useTranslation'

const { t, currentLang, setLanguage } = useTranslation()

// Dil değiştirme örneği
const changeToEnglish = () => {
  setLanguage('2')
}
</script>
```

Bu sistem sayesinde tüm metinler dinamik olarak çevrilebilir ve kullanıcı deneyimi her dil için optimize edilebilir. 