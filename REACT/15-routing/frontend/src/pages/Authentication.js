import { redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
    return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {

    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get('mode') || 'login';

    if (mode !== 'login' && mode !== 'signup') {
        throw new Response(JSON.stringify({ message: 'Invalid mode' }), {
            status: 422
        });
    }

    const data = request.formData();
    const authData = {
        email: data.get('email'),
        password: data.get('password')
    };

    console.log(data);
    console.log(authData);

    const response = fetch('http://localhost:8081/' + mode, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData)
    });

    if (response.status === 422 || response.status === 401) {
        throw new Response(JSON.stringify({ message: 'could not authenticate user' }), {
            status: 500
        });
    }

    return redirect('/');
}