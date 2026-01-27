export const startPayment = async (module , applicationId) => {
    // 1. Create order
    const res = await fetch(
      `http://localhost:8080/payments/create-order?module=${module}&applicationId=${applicationId}`,
      {
        method: "POST",
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to create payment order");
    }

    const order = await res.json();

    // 2. Razorpay options
    const options = {
      key: "rzp_test_S8oZkCOdBEMSPN", // test key
      amount: order.amount,
      currency: order.currency,
      name: "KFCC",
      description: "Membership Payment",
      order_id: order.id,

      handler: async function (response) {
        
        console.log("Payment order created success", response);

        const res = await fetch("http://localhost:8080/payments/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(response),
        });

        if (!res.ok) {
          throw new Error("Payment verification failed");
        }

        const data = await res.json();
        console.log("Verification result:", data);

      },

      theme: {
        color: "#0f172a",
      },
    };

    // 3. Open checkout
    const rzp = new window.Razorpay(options);
    rzp.open();
    
};