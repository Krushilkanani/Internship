import reactImg from "../assets/react-core-concepts.png";

const reactDescription = ['Fundamentals', 'Crutial', 'Core'];

function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

export default function Header() {
    const decription = reactDescription[getRandomInt(3)];
    return (
        <header>
            <img src={reactImg} alt="Stylized atom" />
            <h1>React Essentials</h1>
            <p>
                {decription} React concepts you will need for almost any app you are
                going to build!
            </p>
        </header>
    );
}