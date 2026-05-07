import { Footer, Header, SideNav } from "@/features/layout";
import { About, Creation, Hero, Modules, Profile, Projects } from "./sections";

export default function HomePage() {
    return (
        <>
            <SideNav />
            <Header />
            <main id="main-content">
                <Hero />
                <About />
                <Projects />
                <Creation />
                <Modules />
                <Profile />
            </main>
            <Footer />
        </>
    );
}
