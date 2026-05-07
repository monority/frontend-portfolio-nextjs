'use client'

import AiIcon from './icons/AiIcon'
import ArrowRightIcon from './icons/ArrowRightIcon'
import DockerIcon from './icons/DockerIcon'
import EmailIcon from './icons/EmailIcon'
import FigmaIcon from './icons/FigmaIcon'
import FirebaseIcon from './icons/FirebaseIcon'
import GithubIcon from './icons/GithubIcon'
import LinkedinIcon from './icons/LinkedinIcon'
import LocationIcon from './icons/LocationIcon'
import MotionIcon from './icons/MotionIcon'
import NeonIcon from './icons/NeonIcon'
import NETIcon from './icons/NETIcon'
import NextJsIcon from './icons/NextJsIcon'
import NodeIcon from './icons/NodeIcon'
import PhoneIcon from './icons/PhoneIcon'
import PHPIcon from './icons/PHPIcon'
import RailwayIcon from './icons/RailwayIcon'
import ReactIcon from './icons/ReactIcon'
import ResumeIcon from './icons/ResumeIcon'
import ScrumIcon from './icons/ScrumIcon'
import SQLIcon from './icons/SQLIcon'
import TimeIcon from './icons/TimeIcon'
import i18nIcon from './icons/i18nIcon'
import SassIcon from './icons/SassIcon'
import VercelIcon from './icons/VercelIcon'
import ItchIcon from './icons/ItchIcon'
import TypeScriptIcon from './icons/TypeScriptIcon'
import SupabaseIcon from './icons/SupabaseIcon'
import SvelteIcon from './icons/SvelteIcon'
import ThemeIcon from './icons/ThemeIcon'
import DarkModeToggleIcon from './icons/DarkModeToggleIcon'
import DarkModeIcon from './icons/DarkModeIcon'
import LightModeIcon from './icons/LightModeIcon'

import type { IconName, IconProps } from './types'
import LanguageIcon from './icons/LanguageIcon'
import User from './icons/User'
import MessageIcon from './icons/MessageIcon'
import TailwindIcon from './icons/TailwindIcon'
import RenderIcon from './icons/RenderIcon'
import AstroIcon from './icons/AstroIcon'
import ExpressIcon from './icons/ExpressIcon'
import MongoIcon from './icons/MongoIcon'
import JWTIcon from './icons/JWTIcon'
import NodemonIcon from './icons/NodemonIcon'
import VscodeIcon from './icons/VscodeIcon'
import PostmanIcon from './icons/PostmanIcon'
import JSIcon from './icons/JSIcon'
import CSharpIcon from './icons/CSharpIcon'
import PhotoshopIcon from './icons/PhotoshopIcon'
import CloudFareIcon from './icons/CloudFareIcon'
import DashboardPrIcon from './icons/DashboardPrIcon'
import D3JSIcon from './icons/D3JSIcon'
import WebsocketIcon from './icons/WebsocketIcon'
import StorybookIcon from './icons/StorybookIcon'
import CSSIcon from './icons/CSSIcon'
import CopyIcon from './icons/CopyIcon'
import CheckIcon from './icons/CheckIcon'
import GSAPIcon from './icons/GSAPIcon'
import ThreeJSIcon from './icons/ThreeJSIcon'
import PrismaIcon from './icons/PrismaIcon'
import HorlogesIcon from './icons/HorlogesIcon'
import SkyllswapIcon from './icons/SkyllswapIcon'
import LibraryIcon from './icons/LibraryIcon'
import HumanworkforceIcon from './icons/HumanworkforceIcon'
import CesarLezardIcon from './icons/CesarLezardIcon'
import SourceIcon from './icons/SourceIcon'
import GuiIcon from './icons/GuiIcon'
import GameIcon from './icons/GameIcon'
import HammerIcon from './icons/HammerIcon'
import DesignIcon from './icons/DesignIcon'
import UnityIcon from './icons/UnityIcon'
import MonorityIcon from './icons/MonorityIcon'
import NpmIcon from './icons/NpmIcon'

type IconComponent = React.FC<IconProps>

/**
 * Registry global des icônes disponibles
 * Associe chaque nom d'icône à son composant correspondant
 * @example
 * const IconComponent = iconRegistry['github']
 */
export const iconRegistry: Record<IconName, IconComponent> = {
    ai: AiIcon,
    arrowRight: ArrowRightIcon,
    docker: DockerIcon,
    email: EmailIcon,
    figma: FigmaIcon,
    firebase: FirebaseIcon,
    github: GithubIcon,
    linkedin: LinkedinIcon,
    location: LocationIcon,
    motion: MotionIcon,
    neon: NeonIcon,
    dotnet: NETIcon,
    nextjs: NextJsIcon,
    node: NodeIcon,
    phone: PhoneIcon,
    php: PHPIcon,
    railway: RailwayIcon,
    react: ReactIcon,
    resume: ResumeIcon,
    scrum: ScrumIcon,
    sql: SQLIcon,
    time: TimeIcon,
    i18n: i18nIcon,
    sass: SassIcon,
    vercel: VercelIcon,
    itch: ItchIcon,
    typescript: TypeScriptIcon,
    supabase: SupabaseIcon,
    svelte: SvelteIcon,
    theme: ThemeIcon,
    darkModeToggle: DarkModeToggleIcon,
    darkMode: DarkModeIcon,
    lightMode: LightModeIcon,
    language: LanguageIcon,
    user: User,
    message: MessageIcon,
    tailwind: TailwindIcon,
    render: RenderIcon,
    astro: AstroIcon,
    express: ExpressIcon,
    mongo: MongoIcon,
    jwt: JWTIcon,
    nodemon: NodemonIcon,
    vscode: VscodeIcon,
    postman: PostmanIcon,
    javascript: JSIcon,
    csharp: CSharpIcon,
    photoshop: PhotoshopIcon,
    cloudfare: CloudFareIcon,
    d3js: D3JSIcon,
    websocket: WebsocketIcon,
    storybook: StorybookIcon,
    css: CSSIcon,
    copy: CopyIcon,
    check: CheckIcon,
    gsap: GSAPIcon,
    threejs: ThreeJSIcon,
    prisma: PrismaIcon,
    horloges: HorlogesIcon,
    skyllswap: SkyllswapIcon,
    library: LibraryIcon,
    humanworkforce: HumanworkforceIcon,
    dashboard: DashboardPrIcon,
    cesarlezard: CesarLezardIcon,
    source: SourceIcon,
    gui: GuiIcon,
    game: GameIcon,
    hammer: HammerIcon,
    design: DesignIcon,
    unity: UnityIcon,
    monority: MonorityIcon,
    npm: NpmIcon,
}
