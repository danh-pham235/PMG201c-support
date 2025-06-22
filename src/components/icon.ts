import {
  Star,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  BarChart,
  Edit,
  Trash2,
  Eye,
  BookOpen,
  Award,
  Calendar,
  Settings,
  Bell,
} from "lucide-react";
import {
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaArrowRight,
  FaProjectDiagram,
} from "react-icons/fa";
import { MdOutlineEmail, MdOutlineDashboard } from "react-icons/md";
import { BiMenuAltLeft } from "react-icons/bi";

type IconType = {
  [key: string]: React.FC<React.SVGProps<SVGSVGElement>>;
};

const Icons: IconType = {
  Star: Star,
  ArrowRight: FaArrowRight,
  User: User,
  Mail: Mail,
  Phone: Phone,
  MapPin: MapPin,
  FileText: FileText,
  BarChart: BarChart,
  Users: FaUsers,
  CheckCircle: FaCheckCircle,
  TimesCircle: FaTimesCircle,
  Clock: FaClock,
  Edit: Edit,
  Trash2: Trash2,
  Eye: Eye,
  BookOpen: BookOpen,
  Award: Award,
  Calendar: Calendar,
  Dashboard: MdOutlineDashboard,
  Settings: Settings,
  Bell: Bell,
  Project: FaProjectDiagram,
  Menu: BiMenuAltLeft,
  Email: MdOutlineEmail,
};

export default Icons;