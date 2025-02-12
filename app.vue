<script setup lang="ts">
useHead({
  title: "Obniżenie podatku przez darowizny",
  meta: [
    {
      name: "description",
      content:
        "Kalkulator obniżenia podatku przez darowizny w Polsce. Oblicz, jaką kwotę możesz przekazać na cele charytatywne, oraz o ile obniży to Twój podatek.",
    },
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});
const monthlyZUSPayment = ref(1773.96);
const income = ref();
const donations = ref();
const otherDeductions = ref(0);
const maxDonation = computed(() => income.value * 0.06);
const taxReduction = computed(() => maxDonation.value * 12);
const taxWithoutDonations = computed(() =>
  calculateTax(income.value, monthlyZUSPayment.value, otherDeductions.value)
);
const taxAfterDonations = computed(() =>
  calculateTax(
    income.value,
    monthlyZUSPayment.value,
    otherDeductions.value,
    donations.value
  )
);
function calculateTax(
  income: number,
  monthlyZUSPayment: number,
  otherDeductions: number,
  donations: number = 0
) {
  const annualIncome = income * 12;
  const annualDonations = donations * 12;
  const annualZUS = monthlyZUSPayment * 12;
  const taxableIncome =
    annualIncome - annualDonations - annualZUS - otherDeductions;
  var taxable32 = 0;
  var taxable12 = 0;
  if (taxableIncome >= 120000) {
    taxable32 = taxableIncome - 120000;
  }
  taxable12 = taxableIncome - taxable32 - 30000;
  return taxable12 * 0.12 + taxable32 * 0.32;
}
watch(income, () => {
  donations.value = maxDonation.value;
});
</script>
<template>
  <div class="hero bg-base-200 min-h-screen">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Obniżenie podatku przez darowizny</h1>
        <p class="py-6">
          W Polsce istnieje możliwość odliczenia od podatku dochodowego darowizn
          na cele charytatywne w wysokości do 6% twojego dochodu. Warto z tego
          skorzystać, ponieważ dzięki temu możemy wesprzeć organizacje
          charytatywne, a jednocześnie obniżyć nasz podatek. Po lewej stronie
          znajduje się kalkulator, który pozwoli Ci obliczyć, jaką kwotę możesz
          przekazać na cele charytatywne, oraz o ile obniży to Twój podatek.
        </p>
      </div>
      <div class="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
        <div class="card-body">
          <div class="form-control">
            <span class="label-text">Twój miesięczny dochód (brutto):</span>
            <label class="input input-bordered flex items-center gap-2">
              <input type="number" class="grow" v-model="income" />
              <span>PLN</span>
            </label>
          </div>

          <div class="form-control">
            <span class="label-text">Kwota darowizn miesięcznie:</span>
            <label class="input input-bordered flex items-center gap-2">
              <input type="number" class="grow" v-model="donations" />
              <span>PLN</span>
            </label>
          </div>
          <div class="form-control">
            <span class="label-text">Miesięczna składka ZUS:</span>
            <label class="input input-bordered flex items-center gap-2">
              <input type="number" class="grow" v-model="monthlyZUSPayment" />
              <span>PLN</span>
            </label>
          </div>
          <div class="form-control">
            <span class="label-text">Inne odliczenia:</span>
            <label class="input input-bordered flex items-center gap-2">
              <input type="number" class="grow" v-model="otherDeductions" />
              <span>PLN</span>
            </label>
          </div>
          <table class="table table-xs" v-if="income && donations">
            <tr>
              <td>Maksymalna miesięczna darowizna uznawana do odliczenia:</td>
              <td class="w-1/3 text-right">{{ maxDonation.toFixed(2) }} PLN</td>
            </tr>
            <tr>
              <td>Kwota odliczenia od podatku:</td>
              <td class="text-right">{{ taxReduction.toFixed(2) }} PLN</td>
            </tr>
            <tr>
              <td>Twój podatek bez darowizn:</td>
              <td class="text-right">
                {{ taxWithoutDonations.toFixed(2) }} PLN
              </td>
            </tr>
            <tr>
              <td>Twój podatek po uwzględnieniu darowizn:</td>
              <td class="text-right">{{ taxAfterDonations.toFixed(2) }} PLN</td>
            </tr>
            <tr>
              <td>Zaoszczędzisz:</td>
              <td class="text-right">
                {{ (taxWithoutDonations - taxAfterDonations).toFixed(2) }} PLN
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
