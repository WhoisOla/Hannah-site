const request = new PaymentRequest(paymentMethods, paymentDetails);
// Supported payment methods
const paymentMethods = [{
    supportedMethods: 'https://bobbucks.dev/pay',
   
  }];
  var stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
  var elements = stripe.elements({
    clientSecret: 'CLIENT_SECRET',
  });
  var paymentElement = elements.create('payment');
  // Customize which fields are collected by the Payment Element
var paymentElement = elements.create('payment', {
    fields: {
      billingDetails: {
        name: 'never',
        email: 'never',
      }
    }
  });
  
  // If you disable collecting fields in the Payment Element, you
  // must pass equivalent data when calling `stripe.confirmPayment`.
  form.addEventListener('submit', async (event) => {
    stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'https://example.com',
        payment_method_data: {
          billing_details: {
            name: 'Jenny Rosen',
            email: 'jenny.rosen@example.com',
          }
        },
      },
    })
    .then(function(result) {
      if (result.error) {
        // Inform the customer that there was an error.
      }
    });
  });
  var paymentElement = elements.getElement('payment');
  // Update a Payment Element after creation
var paymentElement = elements.getElement('payment');
paymentElement.update({business: {name: 'Stripe Shop'}});

paymentRequest.on('paymentmethod', async (ev) => {
    // Confirm the PaymentIntent without handling potential next actions (yet).
    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
      clientSecret,
      {payment_method: ev.paymentMethod.id},
      {handleActions: false}
    );
  
    if (confirmError) {
      // Report to the browser that the payment failed, prompting it to
      // re-show the payment interface, or show an error message and close
      // the payment interface.
      ev.complete('fail');
    } else {
      // Report to the browser that the confirmation was successful, prompting
      // it to close the browser payment method collection interface.
      ev.complete('success');
      // Check if the PaymentIntent requires any actions and if so let Stripe.js
      // handle the flow. If using an API version older than "2019-02-11"
      // instead check for: `paymentIntent.status === "requires_source_action"`.
      if (paymentIntent.status === "requires_action") {
        // Let Stripe.js handle the rest of the payment flow.
        const {error} = await stripe.confirmCardPayment(clientSecret);
        if (error) {
          // The payment failed -- ask your customer for a new payment method.
        } else {
          // The payment has succeeded.
        }
      } else {
        // The payment has succeeded.
      }
    }
  });
  elements.create('paymentRequestButton', {
    paymentRequest,
    style: {
      paymentRequestButton: {
        type: 'default',
        // One of 'default', 'book', 'buy', or 'donate'
        // Defaults to 'default'
  
        theme: 'dark',
        // One of 'dark', 'light', or 'light-outline'
        // Defaults to 'dark'
  
        height: '64px',
        // Defaults to '40px'. The width is always '100%'.
      },
    },
  });
