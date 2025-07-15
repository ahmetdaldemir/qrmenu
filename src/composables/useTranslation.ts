import { ref, computed } from 'vue'

// Çeviri verilerini doğrudan tanımlayalım
const translations = {
  tr: {
    menu: "Menü",
    back: "Geri",
    price: "Fiyat",
    description: "Açıklama",
    reservation: {
      banner: "Lütfen bilgilerinizi eksiksiz ve doğru giriniz. Rezervasyonunuzun ardından güvenli ödeme ekranı açılacaktır.",
      selectPackage: "Paket Seçiniz",
      selectMenu: "Menü Seçiniz",
      fullName: "Ad Soyad",
      email: "Email",
      phone: "Telefon",
      hotelName: "Otel Adı",
      room: "Oda",
      date: "Tarih",
      selectDate: "Tarih seçin",
      adult: "Yetişkin",
      child: "Çocuk",
      continueAndCalculate: "Devam ve Hesapla",
      calculating: "Hesaplanıyor...",
      paymentInfo: "Ödeme Bilgileri",
      reservationSummary: "Rezervasyon Özeti",
      hotel: "Otel:",
      roomLabel: "Oda:",
      dateLabel: "Tarih:",
      personCount: "Kişi Sayısı:",
      totalAmount: "Toplam Tutar:",
      cardNumber: "Kart Numarası",
      cardHolder: "Kart Üzerindeki İsim",
      expiryMonth: "Son Kullanma Ay",
      expiryYear: "Son Kullanma Yıl",
      cvv: "CVV",
      completePayment: "Ödemeyi Tamamla",
      processing: "İşleniyor...",
      privacy: "Bilgileriniz gizli tutulur ve güvenli ödeme altyapısı kullanılır.",
      searchCountry: "Ülke ara...",
      phoneError: "{country} için {length} haneli telefon giriniz.",
      calculationError: "Hesaplama sırasında bir hata oluştu. Lütfen tekrar deneyin.",
      packageError: "Paket bilgileri yüklenirken bir hata oluştu.",
      paymentError: "Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.",
      success: "Başarılı!",
      paymentSuccess: "Ödeme işlemi başarıyla tamamlandı."
    }
  },
  en: {
    menu: "Menu",
    back: "Back",
    price: "Price",
    description: "Description",
    reservation: {
      banner: "Please enter your information completely and correctly. After your reservation, a secure payment screen will open.",
      selectPackage: "Select Package",
      selectMenu: "Select Menu",
      fullName: "Full Name",
      email: "Email",
      phone: "Phone",
      hotelName: "Hotel Name",
      room: "Room",
      date: "Date",
      selectDate: "Select Date",
      adult: "Adult",
      child: "Child",
      continueAndCalculate: "Continue and Calculate",
      calculating: "Calculating...",
      paymentInfo: "Payment Information",
      reservationSummary: "Reservation Summary",
      hotel: "Hotel:",
      roomLabel: "Room:",
      dateLabel: "Date:",
      personCount: "Person Count:",
      totalAmount: "Total Amount:",
      cardNumber: "Card Number",
      cardHolder: "Card Holder Name",
      expiryMonth: "Expiry Month",
      expiryYear: "Expiry Year",
      cvv: "CVV",
      completePayment: "Complete Payment",
      processing: "Processing...",
      privacy: "Your information is kept private and secure payment infrastructure is used.",
      searchCountry: "Search country...",
      phoneError: "Please enter a {length}-digit phone number for {country}.",
      calculationError: "An error occurred during calculation. Please try again.",
      packageError: "An error occurred while loading package information.",
      paymentError: "An error occurred during payment. Please try again.",
      success: "Success!",
      paymentSuccess: "Payment completed successfully."
    }
  },
  ru: {
    menu: "Меню",
    back: "Назад",
    price: "Цена",
    description: "Описание",
    reservation: {
      banner: "Пожалуйста, введите вашу информацию полностью и правильно. После вашего бронирования откроется экран безопасной оплаты.",
      selectPackage: "Выберите пакет",
      selectMenu: "Выберите меню",
      fullName: "ФИО",
      email: "Email",
      phone: "Телефон",
      hotelName: "Название отеля",
      room: "Номер",
      date: "Дата",
      selectDate: "Выберите дату",
      adult: "Взрослый",
      child: "Ребенок",
      continueAndCalculate: "Продолжить и рассчитать",
      calculating: "Вычисление...",
      paymentInfo: "Информация об оплате",
      reservationSummary: "Сводка бронирования",
      hotel: "Отель:",
      roomLabel: "Номер:",
      dateLabel: "Дата:",
      personCount: "Количество человек:",
      totalAmount: "Общая сумма:",
      cardNumber: "Номер карты",
      cardHolder: "Имя владельца карты",
      expiryMonth: "Месяц истечения",
      expiryYear: "Год истечения",
      cvv: "CVV",
      completePayment: "Завершить оплату",
      processing: "Обработка...",
      privacy: "Ваша информация хранится в тайне и используется безопасная платежная инфраструктура.",
      searchCountry: "Поиск страны...",
      phoneError: "Пожалуйста, введите {length}-значный номер телефона для {country}.",
      calculationError: "Произошла ошибка при расчете. Пожалуйста, попробуйте снова.",
      packageError: "Произошла ошибка при загрузке информации о пакете.",
      paymentError: "Произошла ошибка при оплате. Пожалуйста, попробуйте снова.",
      success: "Успешно!",
      paymentSuccess: "Оплата успешно завершена."
    }
  },
  de: {
    menu: "Menü",
    back: "Zurück",
    price: "Preis",
    description: "Beschreibung",
    reservation: {
      banner: "Bitte geben Sie Ihre Informationen vollständig und korrekt ein. Nach Ihrer Reservierung öffnet sich ein sicheres Zahlungsbildschirm.",
      selectPackage: "Paket auswählen",
      selectMenu: "Menü auswählen",
      fullName: "Vor- und Nachname",
      email: "E-Mail",
      phone: "Telefon",
      hotelName: "Hotelname",
      room: "Zimmer",
      date: "Datum",
      selectDate: "Datum auswählen",
      adult: "Erwachsener",
      child: "Kind",
      continueAndCalculate: "Weiter und berechnen",
      calculating: "Berechnung...",
      paymentInfo: "Zahlungsinformationen",
      reservationSummary: "Reservierungszusammenfassung",
      hotel: "Hotel:",
      roomLabel: "Zimmer:",
      dateLabel: "Datum:",
      personCount: "Personenanzahl:",
      totalAmount: "Gesamtbetrag:",
      cardNumber: "Kartennummer",
      cardHolder: "Name des Karteninhabers",
      expiryMonth: "Ablaufmonat",
      expiryYear: "Ablaufjahr",
      cvv: "CVV",
      completePayment: "Zahlung abschließen",
      processing: "Verarbeitung...",
      privacy: "Ihre Informationen werden vertraulich behandelt und eine sichere Zahlungsinfrastruktur verwendet.",
      searchCountry: "Land suchen...",
      phoneError: "Bitte geben Sie eine {length}-stellige Telefonnummer für {country} ein.",
      calculationError: "Bei der Berechnung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
      packageError: "Beim Laden der Paketinformationen ist ein Fehler aufgetreten.",
      paymentError: "Bei der Zahlung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
      success: "Erfolgreich!",
      paymentSuccess: "Zahlung erfolgreich abgeschlossen."
    }
  },
  ar: {
    menu: "القائمة",
    back: "رجوع",
    price: "السعر",
    description: "الوصف",
    reservation: {
      banner: "يرجى إدخال معلوماتك بشكل كامل وصحيح. بعد حجزك، ستفتح شاشة دفع آمنة.",
      selectPackage: "اختر الحزمة",
      selectMenu: "اختر القائمة",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      hotelName: "اسم الفندق",
      room: "الغرفة",
      date: "التاريخ",
      selectDate: "اختر التاريخ",
      adult: "بالغ",
      child: "طفل",
      continueAndCalculate: "متابعة وحساب",
      calculating: "جاري الحساب...",
      paymentInfo: "معلومات الدفع",
      reservationSummary: "ملخص الحجز",
      hotel: "الفندق:",
      roomLabel: "الغرفة:",
      dateLabel: "التاريخ:",
      personCount: "عدد الأشخاص:",
      totalAmount: "المبلغ الإجمالي:",
      cardNumber: "رقم البطاقة",
      cardHolder: "اسم حامل البطاقة",
      expiryMonth: "شهر انتهاء الصلاحية",
      expiryYear: "سنة انتهاء الصلاحية",
      cvv: "CVV",
      completePayment: "إكمال الدفع",
      processing: "جاري المعالجة...",
      privacy: "معلوماتك محفوظة بسرية ويتم استخدام بنية تحتية آمنة للدفع.",
      searchCountry: "البحث عن بلد...",
      phoneError: "يرجى إدخال رقم هاتف مكون من {length} أرقام لـ {country}.",
      calculationError: "حدث خطأ أثناء الحساب. يرجى المحاولة مرة أخرى.",
      packageError: "حدث خطأ أثناء تحميل معلومات الحزمة.",
      paymentError: "حدث خطأ أثناء الدفع. يرجى المحاولة مرة أخرى.",
      success: "نجح!",
      paymentSuccess: "تم إكمال عملية الدفع بنجاح."
    }
  }
}

export function useTranslation() {
  const currentLang = ref(localStorage.getItem('langId') || '1')
  // Lang ID'yi dil koduna çevir
  const getLangCode = (langId: string): string => {
    const langMap: { [key: string]: string } = {
      '2': 'tr',
      '1': 'en', 
      '3': 'ru',
      '4': 'de',
      '5': 'ar'
    }
    return langMap[langId] || 'tr'
  }

  const langCode = computed(() => getLangCode(currentLang.value))

  // Çeviri fonksiyonu
  const t = (key: string, params?: { [key: string]: string | number }): string => {
    const keys = key.split('.')
    let value: any = translations[langCode.value as keyof typeof translations]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key // Çeviri bulunamazsa anahtarı döndür
      }
    }

    if (typeof value !== 'string') {
      return key
    }

    // Parametreleri değiştir
    if (params) {
      return Object.entries(params).reduce((str, [param, val]) => {
        return str.replace(new RegExp(`{${param}}`, 'g'), String(val))
      }, value)
    }

    return value
  }

  // Dil değiştirme
  const setLanguage = (langId: string) => {
    currentLang.value = langId
    localStorage.setItem('langId', langId)
  }

  return {
    currentLang,
    langCode,
    t,
    setLanguage
  }
} 