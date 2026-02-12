async function testOTP() {
    const response = await fetch('http://localhost:3002/api/send-otp-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: 'test@example.com',
            otp: '123456',
            username: 'Gopalakrishna'
        }),
    });

    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2));
}

testOTP();
