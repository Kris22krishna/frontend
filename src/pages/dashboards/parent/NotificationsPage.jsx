import { useOutletContext } from "react-router-dom";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    AlertTriangle,
    MessageCircle,
    Bell,
    CheckCircle2,
    Clock,
} from "lucide-react";

// Mock data
const notifications = [];

export default function NotificationsPage() {
    const { selectedChild } = useOutletContext();

    // Safety check
    if (!selectedChild) return null;

    const unreadCount = notifications.filter((n) => !n.read).length;
    const alertCount = notifications.filter((n) => n.type === "alert" && !n.read).length;

    const getIcon = (type) => {
        switch (type) {
            case "alert":
                return AlertTriangle;
            case "warning":
                return Bell;
            case "success":
                return CheckCircle2;
            default:
                return MessageCircle;
        }
    };

    const getColor = (type) => {
        switch (type) {
            case "alert":
                return "bg-red-50 border-red-200 text-red-700";
            case "warning":
                return "bg-yellow-50 border-yellow-200 text-yellow-700";
            case "success":
                return "bg-green-50 border-green-200 text-green-700";
            default:
                return "bg-blue-50 border-blue-200 text-blue-700";
        }
    };

    return (
        <div className="space-y-6 max-w-4xl animate-fade-in">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900">
                        Notifications
                    </h1>
                    <p className="text-slate-600 mt-1">
                        Stay updated on {selectedChild.name}'s learning progress
                    </p>
                </div>
                <Button variant="outline">Mark All as Read</Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-slate-600 mb-1">Unread</div>
                                <div className="text-2xl font-semibold text-slate-900">
                                    {unreadCount}
                                </div>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                <Bell className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-slate-600 mb-1">Alerts</div>
                                <div className="text-2xl font-semibold text-slate-900">
                                    {alertCount}
                                </div>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                                <AlertTriangle className="h-6 w-6 text-red-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-slate-600 mb-1">Total</div>
                                <div className="text-2xl font-semibold text-slate-900">
                                    {notifications.length}
                                </div>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
                                <MessageCircle className="h-6 w-6 text-slate-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Notifications Tabs */}
            <Tabs defaultValue="all">
                <TabsList>
                    <TabsTrigger value="all">
                        All ({notifications.length})
                    </TabsTrigger>
                    <TabsTrigger value="unread">
                        Unread ({unreadCount})
                    </TabsTrigger>
                    <TabsTrigger value="alerts">
                        Alerts ({alertCount})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-3 mt-4">
                    {notifications.map((notification) => {
                        const Icon = getIcon(notification.type);
                        return (
                            <Card
                                key={notification.id}
                                className={`border-l-4 ${notification.read ? "opacity-60" : ""
                                    } ${notification.type === "alert"
                                        ? "border-l-red-500"
                                        : notification.type === "warning"
                                            ? "border-l-yellow-500"
                                            : notification.type === "success"
                                                ? "border-l-green-500"
                                                : "border-l-blue-500"
                                    }`}
                            >
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-4">
                                        <div
                                            className={`h-10 w-10 rounded-full flex items-center justify-center ${getColor(
                                                notification.type
                                            )}`}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-1">
                                                <div className="font-medium text-slate-900">
                                                    {notification.title}
                                                </div>
                                                {!notification.read && (
                                                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                                                        New
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="text-sm text-slate-600 mb-2">
                                                {notification.message}
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1 text-xs text-slate-500">
                                                    <Clock className="h-3 w-3" />
                                                    {notification.time}
                                                </div>
                                                <Button variant="ghost" size="sm">
                                                    View Details
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </TabsContent>

                <TabsContent value="unread" className="space-y-3 mt-4">
                    {/* Reuse similar map for unread */}
                    <div className="text-center text-sm text-slate-500 py-8">
                        Showing unread items...
                    </div>
                </TabsContent>

                <TabsContent value="alerts" className="space-y-3 mt-4">
                    {/* Reuse similar map for alerts */}
                    <div className="text-center text-sm text-slate-500 py-8">
                        Showing alerts...
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
