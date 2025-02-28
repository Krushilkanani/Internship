import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
    return (
        <>
            <MainNavigation />
            <main>
                <h1>Error occured...</h1>
                <h1>Page not found!</h1>
            </main>
        </>
    );
}

export default ErrorPage;