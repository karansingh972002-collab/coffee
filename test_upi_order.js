

async function testOrder() {
    try {
        let res = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Test', email: 'test_order2@example.com', password: 'password123' })
        });
        let data = await res.json();

        if (!res.ok && data.message !== 'User already exists') {
            console.log("Register failed:", data);
            res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: 'test_order2@example.com', password: 'password123' })
            });
            data = await res.json();
        }

        const token = data.token || (data.data && data.data.token);
        if (!token) throw new Error("No token received");

        console.log("Got token!");

        const orderPayload = {
            packageId: '000000000000000000000001',
            starName: 'Test UPI Star',
            dedicationMessage: '',
            dedicationDate: new Date().toISOString(),
            recipientInfo: { name: 'Karan', email: 'karan@example.com', phone: '1234567890' },
            shippingAddress: { address: '123 Test St', city: 'Testville', postalCode: '123456' },
            paymentMethod: 'upi',
            paymentStatus: 'completed',
            paymentDetails: { upiId: 'test@upi' }
        };

        const orderRes = await fetch('http://localhost:5000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderPayload)
        });

        const orderData = await orderRes.json();
        console.log("Order Creation Result:", orderData);

    } catch (err) {
        console.error(err);
    }
}

testOrder();
