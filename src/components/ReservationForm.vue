<template>
  <form @submit.prevent="submit">
    <div class="banner">
      <p class="desc">
        Lütfen bilgilerinizi eksiksiz ve doğru giriniz. Rezervasyonunuzun
        ardından güvenli ödeme ekranı açılacaktır.
      </p>
    </div>
    <div v-if="!showPayment">
      <label>
        <span
          ><svg class="icon" viewBox="0 0 24 24">
            <path
              d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 100-8 4 4 0 000 8z"
              fill="#6366f1"
            />
          </svg>
          Ad Soyad</span
        >
        <input v-model="form.fullname" placeholder="Ad Soyad" />
      </label>
      <label>
        <span
          ><svg class="icon" viewBox="0 0 24 24">
            <path
              d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.2.48 2.5.73 3.85.73a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.25 2.65.73 3.85a1 1 0 01-.21 1.11l-2.2 2.2z"
              fill="#6366f1"
            />
          </svg>
          Email</span
        >
        <input v-model="form.email" placeholder="Email" />
      </label>
      <label>
        <span
          ><svg class="icon" viewBox="0 0 24 24">
            <path
              d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.2.48 2.5.73 3.85.73a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.25 2.65.73 3.85a1 1 0 01-.21 1.11l-2.2 2.2z"
              fill="#6366f1"
            />
          </svg>
          Telefon</span
        >
        <div class="phone-row">
          <div class="country-select-wrapper">
            <div class="country-select-header" @click="toggleCountryDropdown">
              <span
                >{{ selectedCountry?.flag }}
                {{ selectedCountry?.dialCode }}</span
              >
              <svg class="icon" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5z" fill="#6366f1" />
              </svg>
            </div>
            <div v-if="showCountryDropdown" class="country-dropdown">
              <input
                v-model="countrySearch"
                placeholder="Ülke ara..."
                class="country-search"
                @input="filterCountries"
              />
              <div class="country-list">
                <div
                  v-for="country in filteredCountries"
                  :key="country.code"
                  class="country-option"
                  @click="selectCountry(country)"
                >
                  <span
                    >{{ country.flag }} {{ country.name }} ({{
                      country.dialCode
                    }})</span
                  >
                </div>
              </div>
            </div>
          </div>
          <input
            v-model="form.phone"
            style="margin-bottom: 0"
            placeholder="Telefon"
            @input="validatePhone"
            @keypress="(e) => !/[0-9]/.test(e.key) && e.preventDefault()"
            class="phone-input"
          />
        </div>
        <span v-if="phoneError" class="phone-error">{{ phoneError }}</span>
      </label>
      <div class="row">
        <label style="flex: 1">
          <span
            ><svg class="icon" viewBox="0 0 24 24">
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 119.5 9 2.5 2.5 0 0112 11.5z"
                fill="#6366f1"
              />
            </svg>
            Otel Adı</span
          >
          <input
            v-model="form.hotel"
            style="width: auto"
            placeholder="Otel Adı"
          />
        </label>
        <label style="flex: 1">
          <span
            ><svg class="icon" viewBox="0 0 24 24">
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 119.5 9 2.5 2.5 0 0112 11.5z"
                fill="#6366f1"
              />
            </svg>
            Otel Adı</span
          >
          <input v-model="form.room" style="width: auto" placeholder="Room" />
        </label>
        <label style="flex: 1">
          <span
            ><svg class="icon" viewBox="0 0 24 24">
              <path
                d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H5V9h14zm0-11H5V6h14z"
                fill="#6366f1"
              />
            </svg>
            Tarih</span
          >
          <Datepicker
            v-model="form.date"
            :enable-time-picker="false"
            :auto-apply="true"
            :min-date="new Date()"
            format="dd.MM.yyyy"
            locale="tr"
            placeholder="Tarih seçin"
            class="custom-datepicker"
          />
        </label>
      </div>
      <div class="row select-row">
        <label>
          <span>
            <svg class="icon" viewBox="0 0 24 24">
              <path
                d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C17 14.17 12.33 13 10 13zm8 0c-.29 0-.62.02-.97.05C17.16 14.13 19 15.1 19 16.5V19h5v-2.5c0-2.33-4.67-3.5-7-3.5z"
                fill="#6366f1"
              />
            </svg>
            Yetişkin
          </span>
          <select v-model.number="form.adult">
            <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
          </select>
        </label>
        <label>
          <span>
            <svg class="icon" viewBox="0 0 24 24">
              <path
                d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 100-8 4 4 0 000 8z"
                fill="#6366f1"
              />
            </svg>
            Çocuk
          </span>
          <select v-model.number="form.child">
            <option v-for="n in 11" :key="n - 1" :value="n - 1">
              {{ n - 1 }}
            </option>
          </select>
        </label>
      </div>
      <button type="submit" :disabled="!isFormValid || loading">
        <svg class="icon lock" viewBox="0 0 24 24">
          <path
            d="M12 17a2 2 0 002-2v-2a2 2 0 10-4 0v2a2 2 0 002 2zm6-6V9a6 6 0 10-12 0v2a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2v-7a2 2 0 00-2-2zm-8-2a4 4 0 118 0v2H8V9z"
            fill="#fff"
          />
        </svg>
        {{ loading ? "Hesaplanıyor..." : "Devam ve Hesapla" }}
      </button>
    </div>

    <div v-show="showPayment" class="payment-section">
      <h3>Ödeme Bilgileri</h3>
      <div class="calculation-summary">
        <h4>Rezervasyon Özeti</h4>
        <div class="summary-item">
          <span>Otel:</span>
          <span>{{ form.hotel }}</span>
        </div>
        <div class="summary-item">
          <span>Room:</span>
          <span>{{ form.room }}</span>
        </div>
        <div class="summary-item">
          <span>Tarih:</span>
          <span>{{ form.date }}</span>
        </div>
        <div class="summary-item">
          <span>Kişi Sayısı:</span>
          <span>{{ form.adult }} Yetişkin, {{ form.child }} Çocuk</span>
        </div>
        <div class="summary-item total">
          <span>Toplam Tutar:</span>
          <span
            >{{ calculationResult?.totalPrice?.toFixed(2) || "0.00" }} €</span
          >
        </div>
      </div>

      <div class="payment-form">
        <label>
          <span
            ><svg class="icon" viewBox="0 0 24 24">
              <path
                d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"
                fill="#6366f1"
              />
            </svg>
            Kart Numarası</span
          >
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            maxlength="19"
            v-model="form.cardNumber"
          />
        </label>
        <label>
          <span
            ><svg class="icon" viewBox="0 0 24 24">
              <path
                d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
                fill="#6366f1"
              />
            </svg>
            Kart Üzerindeki İsim</span
          >
          <input type="text" placeholder="John Doe" v-model="form.cardHolder" />
        </label>
        <div class="row">
          <label>
            <span
              ><svg class="icon" viewBox="0 0 24 24">
                <path
                  d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
                  fill="#6366f1"
                />
              </svg>
              Son Kullanma Ay</span
            >
            <select v-model="form.expiryMonth">
              <option
                v-for="month in 12"
                :key="month"
                :value="month.toString().padStart(2, '0')"
              >
                {{ month.toString().padStart(2, "0") }}
              </option>
            </select>
          </label>
          <label>
            <span
              ><svg class="icon" viewBox="0 0 24 24">
                <path
                  d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
                  fill="#6366f1"
                />
              </svg>
              Son Kullanma Yıl</span
            >
            <select v-model="form.expiryYear">
              <option
                v-for="year in 10"
                :key="year"
                :value="(new Date().getFullYear() + year).toString()"
              >
                {{ new Date().getFullYear() + year }}
              </option>
            </select>
          </label>
          <label>
            <span
              ><svg class="icon" viewBox="0 0 24 24">
                <path
                  d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"
                  fill="#6366f1"
                />
              </svg>
              CVV</span
            >
            <input
              type="text"
              placeholder="123"
              maxlength="3"
              v-model="form.ccv"
            />
          </label>
        </div>
        <button type="button" @click="submitPayment" :disabled="loading">
          <svg class="icon lock" viewBox="0 0 24 24">
            <path
              d="M12 17a2 2 0 002-2v-2a2 2 0 10-4 0v2a2 2 0 002 2zm6-6V9a6 6 0 10-12 0v2a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2v-7a2 2 0 00-2-2zm-8-2a4 4 0 118 0v2H8V9z"
              fill="#fff"
            />
          </svg>
          {{ loading ? "İşleniyor..." : "Ödemeyi Tamamla" }}
        </button>
      </div>
    </div>

    <p class="privacy">
      Bilgileriniz gizli tutulur ve güvenli ödeme altyapısı kullanılır.
    </p>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import axios from "axios";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { API_URL } from "../constants";
interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
  phoneLength: number;
}

interface CalculationResult {
  status: boolean;
  totalPrice: number;
  reservation_id: string;
  message?: string;
}

const TOUR_ID = "1";
const emit = defineEmits(["submit"]);
const loading = ref(false);
const calculationResult = ref<CalculationResult | null>(null);
const showPayment = ref(false);

const countries = ref<Country[]>([]);
const selectedCountry = ref<Country | null>(null);
const showCountryDropdown = ref(false);
const countrySearch = ref("");
const filteredCountries = ref<Country[]>([]);

const router = useRouter();

onMounted(async () => {
  try {
    const response = await axios.get(
      "https://restcountries.com/v3.1/all?fields=cca2,translations,idd,flag"
    );
    const formattedCountries = response.data
      .filter((country: any) => country.idd?.root && country.translations?.tur)
      .map((country: any) => ({
        code: country.cca2,
        name: country.translations.tur.common,
        dialCode: country.idd.root + (country.idd.suffixes?.[0] || ""),
        flag: country.flag,
        phoneLength: 10,
      }))
      .sort((a: Country, b: Country) => a.name.localeCompare(b.name, "tr"));

    countries.value = formattedCountries;
    filteredCountries.value = formattedCountries;
    selectedCountry.value =
      formattedCountries.find((country: Country) => country.code === "TR") ||
      formattedCountries[0];
  } catch (error) {
    console.error("Countries fetch error:", error);
    Swal.fire({
      icon: "error",
      title: "Hata!",
      text: "Ülke bilgileri yüklenirken bir hata oluştu.",
      confirmButtonText: "Tamam",
    });
  }
});

const form = reactive({
  fullname: "",
  phone: "",
  hotel: "",
  room: "",
  email: "",
  date: new Date(),
  adult: 1,
  child: 0,
  cardNumber: "",
  cardHolder: "",
  expiryMonth: new Date().getMonth() + 1,
  expiryYear: new Date().getFullYear(),
  ccv: "",
});
const phoneError = ref("");

function validatePhone() {
  if (!selectedCountry.value) return;

  // Sadece rakamları al
  const digits = form.phone.replace(/\D/g, "");

  // Maksimum uzunluk kontrolü (ülke kodu + 10 rakam)
  const maxLength = selectedCountry.value.phoneLength;
  if (digits.length > maxLength) {
    form.phone = digits.slice(0, maxLength);
  }

  // Telefon numarasını formatla
  if (digits.length > 0) {
    form.phone = digits;
  }

  // Validasyon kontrolü
  if (digits.length !== selectedCountry.value.phoneLength) {
    phoneError.value = `${selectedCountry.value.name} için ${selectedCountry.value.phoneLength} haneli telefon giriniz.`;
  } else {
    phoneError.value = "";
  }
}

async function calculate() {
  try {
    console.log(localStorage.getItem("token"));
    loading.value = true;
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/common/calculate`,
      {
        ...form,
        country: selectedCountry.value,
        tenant_id: localStorage.getItem("tenant_id"),
        user_id: localStorage.getItem("userId"),
        supplier_id: 3,
        tour_id: TOUR_ID,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status) {
      calculationResult.value = response.data.data;
      showPayment.value = true;
      localStorage.setItem("reservationId", response.data.data.reservation_id);
    } else {
      Swal.fire({
        icon: "error",
        title: "Hata!",
        text: "Hesaplama sırasında bir hata oluştu. Lütfen tekrar deneyin.",
        confirmButtonText: "Tamam",
      });
    }
  } catch (error) {
    console.error("Hesaplama hatası:", error);
    Swal.fire({
      icon: "error",
      title: "Hata!",
      text: "Hesaplama sırasında bir hata oluştu. Lütfen tekrar deneyin.",
      confirmButtonText: "Tamam",
    });
  } finally {
    loading.value = false;
  }
}
async function submitPayment() {
  try {
    loading.value = true;
    const token = localStorage.getItem("token");
    console.log("Submitting payment with token:", token);

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.post(
      `${API_URL}/common/payment`,
      {
        ...form,
        country: selectedCountry.value,
        amount: calculationResult.value?.totalPrice,
        tenant_id: localStorage.getItem("tenant_id"),
        reservation_id: localStorage.getItem("reservationId"),
        language_id: localStorage.getItem("langId"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status) {
      calculationResult.value = response.data;
      showPayment.value = true;
      localStorage.setItem("reservationId", response.data.data?.orderId);
      Swal.fire({
        icon: "success",
        title: "Başarılı!",
        text: "Ödeme işlemi başarıyla tamamlandı.",
        confirmButtonText: "Tamam",
      }).then(() => {
        router.push("/success");
      });
    } else {
      throw new Error(response.data.message || "Beklenmeyen bir hata oluştu");
    }

  } catch (error) {
    console.error("Ödeme hatası:", error);
    Swal.fire({
      icon: "error",
      title: "Hata!",
      text: (error as Error).message || "Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.",      confirmButtonText: "Tamam",
    });
  } finally {
    loading.value = false;
  }
}


function submit() {
  validatePhone();
  if (phoneError.value) return;
  calculate();
}

function toggleCountryDropdown() {
  showCountryDropdown.value = !showCountryDropdown.value;
  if (showCountryDropdown.value) {
    filteredCountries.value = countries.value;
  }
}

function filterCountries() {
  if (!countries.value) return;

  const search = countrySearch.value.toLowerCase();
  filteredCountries.value = countries.value.filter(
    (country) =>
      country.name.toLowerCase().includes(search) ||
      country.dialCode.includes(search)
  );
}

function selectCountry(country: Country) {
  selectedCountry.value = country;
  showCountryDropdown.value = false;
  countrySearch.value = "";
}

const isFormValid = computed(() => {
  return (
    form.fullname.trim() !== "" &&
    form.phone.trim() !== "" &&
    !phoneError.value &&
    form.hotel.trim() !== "" &&
    form.room.trim() !== "" &&
    form.date !== null &&
    form.adult > 0
  );
});
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(60, 72, 88, 0.12);
  padding: 2.5rem 2rem;
  max-width: 700px;
  margin: 2rem auto;
  position: relative;
  border: 1px solid #f1f1f1;
  color: #000;
}
input,
select {
  color: #000;
}
.banner {
  text-align: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f3f4f6;
}
.logo {
  width: 120px;
  object-fit: contain;
  margin-bottom: 0.5rem;
}
h2 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 0.25rem;
}
.desc {
  color: #6366f1;
  font-size: 1.05rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}
.privacy {
  color: #64748b;
  font-size: 0.98rem;
  text-align: center;
  margin-top: 1.5rem;
}
label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 600;
  color: #222;
  font-size: 1.05rem;
  letter-spacing: 0.01em;
}
input,
button,
select {
  padding: 1rem 1.1rem;
  font-size: 1.08rem;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  transition: border 0.2s, box-shadow 0.2s;
  margin-top: 0.1rem;
}
input:focus,
select:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 2px #6366f133;
  background: #fff;
}
button {
  background: linear-gradient(90deg, #6366f1 0%, #4f46e5 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  margin-top: 0.5rem;
  box-shadow: 0 2px 8px 0 #6366f122;
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.13rem;
  letter-spacing: 0.01em;
}
button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
button:hover:enabled {
  background: linear-gradient(90deg, #4f46e5 0%, #6366f1 100%);
  box-shadow: 0 4px 16px 0 #6366f144;
  transform: translateY(-2px) scale(1.01);
}
.row {
  display: flex;
  gap: 1.2rem;
}
.row label {
  flex: 1 1 0;
  min-width: 0;
}
select {
  appearance: none;
  -webkit-appearance: none;
  background: #f9fafb
    url('data:image/svg+xml;utf8,<svg fill="%236366f1" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M7.293 7.293a1 1 0 011.414 0L10 8.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"/></svg>')
    no-repeat right 0.75rem center/1.2em auto;
}
.datepicker {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #f9fafb;
}
.icon {
  width: 1.25em;
  height: 1.25em;
  vertical-align: middle;
  margin-right: 0.4em;
  margin-bottom: 0.1em;
  color: #6366f1;
}
.lock {
  width: 1.3em;
  height: 1.3em;
  margin-right: 0.5em;
}
.phone-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.country-select-wrapper {
  position: relative;
  min-width: 110px;
}
.country-select-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px 0 0 12px;
  cursor: pointer;
  user-select: none;
  font-size: 1.05rem;
}
.country-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin-top: 4px;
  box-shadow: 0 4px 12px -1px rgba(0, 0, 0, 0.08);
  z-index: 10;
}
.country-search {
  width: 100%;
  padding: 0.7rem 1rem;
  border: none;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 12px 12px 0 0;
  font-size: 1.05rem;
}
.country-list {
  max-height: 200px;
  overflow-y: auto;
}
.country-option {
  padding: 0.7rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 1.05rem;
}
.country-option:hover {
  background-color: #f3f4f6;
}
.phone-input {
  flex: 1;
  border-radius: 0 12px 12px 0;
  border-left: none;
  text-align: left;
  padding-left: 1rem;
  font-size: 1.05rem;
}
.phone-error {
  color: #dc2626;
  font-size: 0.98em;
  margin-top: 0.2em;
  text-align: left;
}
@media (max-width: 600px) {
  form {
    padding: 1.1rem 0.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px 0 rgba(60, 72, 88, 0.1);
  }
  .row,
  .select-row {
    flex-direction: column;
    gap: 0.7rem;
  }
  .banner {
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
  }
  .logo {
    width: 100px;
  }
  .phone-row {
    flex-direction: column;
    gap: 0.2rem;
    align-items: stretch;
  }
  .country-select-wrapper {
    width: 100%;
  }
  .country-select-header {
    border-radius: 12px;
    margin-bottom: 0.5rem;
  }
  .country-dropdown {
    width: 100%;
  }
  label {
    font-size: 1rem;
    gap: 0.3rem;
  }
  input,
  button,
  select {
    font-size: 1rem;
    padding: 0.8rem 0.8rem;
    border-radius: 10px;
  }
  .calculation-summary {
    padding: 1rem;
    border-radius: 10px;
  }
  .summary-item {
    font-size: 0.97rem;
  }
}

.payment-section {
  animation: fadeIn 0.3s ease-in-out;
}

.calculation-summary {
  background: #f8fafc;
  border-radius: 14px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px 0 #6366f111;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-item.total {
  font-weight: 700;
  color: #6366f1;
  font-size: 1.13rem;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 2px solid #e2e8f0;
}

.payment-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .calculation-summary {
    padding: 1rem;
    border-radius: 10px;
  }
  .summary-item {
    font-size: 0.97rem;
  }
}

.custom-datepicker {
  width: 100%;
}

:deep(.dp__input) {
  padding: 1rem 1.1rem;
  font-size: 1.08rem;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  text-align: center;
  background: #f9fafb;
  transition: border 0.2s, box-shadow 0.2s;
  width: 100%;
}

:deep(.dp__input:focus) {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 2px #6366f133;
  background: #fff;
}

:deep(.dp__input_icon) {
  cursor: pointer;
  position: absolute;
  top: 35%;
  inset-inline-start: 0;
  transform: translateY(-50%);
  color: var(--dp-icon-color);
}

:deep(.dp--clear-btn) {
  top: 35%;
}

:deep(.dp__theme_light) {
  --dp-background-color: #fff;
  --dp-text-color: #222;
  --dp-hover-color: #f3f4f6;
  --dp-hover-text-color: #222;
  --dp-hover-icon-color: #6366f1;
  --dp-primary-color: #6366f1;
  --dp-primary-text-color: #fff;
  --dp-secondary-color: #f3f4f6;
  --dp-border-color: #e5e7eb;
  --dp-menu-border-color: #e5e7eb;
  --dp-border-radius: 12px;
  --dp-cell-border-radius: 6px;
  --dp-button-height: 38px;
  --dp-month-year-row-height: 38px;
  --dp-weekday-height: 38px;
  --dp-cell-size: 38px;
  --dp-cell-padding: 6px;
  --dp-common-transition: all 0.1s ease-in;
  --dp-font-family: inherit;
}

.select-row {
  display: flex;
  gap: 1.2rem;
  width: 100%;
  flex-direction: row;
}
.select-row label {
  flex: 1 1 0;
  min-width: 0;
}
@media (max-width: 600px) {
  .select-row {
    gap: 0.7rem;
  }
}
</style>
