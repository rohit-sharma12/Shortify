import { Link, useNavigate } from "react-router-dom"
import { Button } from "./button"
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { UrlState } from "@/context";
import useFetch from "@/hooks/use-fetch";
import { logout } from "@/db/apiAuth";
import { LinkIcon, LogOut } from "lucide-react";

const Header = () => {
    const navigate = useNavigate();

    const { user, fetchUser } = UrlState();
    const { loading, fn: fnLogout } = useFetch(logout);

    return (
        <nav className="py-5 flex justify-between items-center ml-5">
            <Link to="/">
                <img src="logo.png" alt="logo" className="h-16" />
            </Link>

            <div className="flex gap-4 mr-3">
                {!user ?
                    <Button onClick={() => navigate("/auth")} variant="destructive">Login </Button>
                    : (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-10 h-12 rounded-full overflow-hidden mb-5">
                                <Avatar>
                                    <AvatarImage src={user?.user_metadata?.profile_pic} />
                                    <AvatarFallback>RS</AvatarFallback>
                                </Avatar>

                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem><Link to="/dashboard" className="flex">
                                    <LinkIcon className="mr-2 w-4 h-4" />
                                    My Links</Link></DropdownMenuItem>
                                <DropdownMenuItem className="text-red-400 flex">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span onClick={() => {
                                        fnLogout().then(() => {
                                            fetchUser();
                                            navigate("/")
                                        })

                                    }}>Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                }
            </div>

        </nav >
    )
}

export default Header
