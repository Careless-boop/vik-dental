const { createApp, onMounted, ref, computed } = Vue;

const appConfig = {
  setup() {
    const pricing = ref([
      {
        id: 1,
        title: "Initial Consultation",
        price: 50
      },
      {
        id: 2,
        title: "Routine Dental Exam",
        price: 70
      },
      {
        id: 3,
        title: "Digital X-rays",
        price: 100
      },
      {
        id: 4,
        title: "Oral Cancer Screening",
        price: 100
      },
      {
        id: 5,
        title: "Professional Cleaning (Prophylaxis)",
        price: 120
      },
      
    ]);

    const selectedServices = ref([]);

    const isModalOpen = ref(false);

    const totalPrice = computed(() => {
      return selectedServices.value.reduce(
        (total, service) => total + service.price,
        0
      );
    });

    const addToCart = (service) => {
      if (selectedServices.value.some((item) => item.title === service.title)) {
        alert("You have already choosed this service!");
      } else {
        selectedServices.value.push(service);
        localStorage.setItem(
          "selectedServices",
          JSON.stringify(selectedServices.value)
        );
      }
    };

    const removeFromCart = (index) => {
      selectedServices.value.splice(index, 1);
      localStorage.setItem(
        "selectedServices",
        JSON.stringify(selectedServices.value)
      );
    };

    const selectedServicesDetails = computed(() => {
      return selectedServices.value;
    });

    const selectedServicesCount = computed(() => {
      return selectedServices.value.length;
    });

    onMounted(() => {
      console.log("Vue is mounted");
      const storedServices = localStorage.getItem("selectedServices");
      if (storedServices) {
        selectedServices.value = JSON.parse(storedServices);
      }
    });

    return {
      pricing,
      selectedServicesDetails,
      selectedServicesCount,
      totalPrice,
      isModalOpen,
      addToCart,
      removeFromCart,
    };
  },
};

createApp(appConfig).mount("#pricing-schedule");
