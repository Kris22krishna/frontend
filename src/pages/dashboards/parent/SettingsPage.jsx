import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { api } from "@/services/api";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Bell, User, Shield, MessageCircle } from "lucide-react";

export default function SettingsPage() {
    const { selectedChild } = useOutletContext();
    const [profile, setProfile] = useState(null);
    const [children, setChildren] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [pData, cData] = await Promise.all([
                    api.getParentProfile(),
                    api.getLinkedChildren()
                ]);
                setProfile(pData);
                setChildren(cData || []);
            } catch (e) { console.error(e); }
            finally { setLoading(false); }
        };
        loadData();
    }, []);

    const handleProfileChange = (key, value) => {
        setProfile(prev => ({ ...prev, [key]: value }));
    };

    if (loading) return <div className="p-8 text-center text-slate-500">Loading profile...</div>;

    return (
        <div className="space-y-6 max-w-4xl animate-fade-in">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
                <p className="text-slate-600 mt-1">
                    Manage your account and notification preferences
                </p>
            </div>

            {/* Settings Tabs */}
            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="profile" className="gap-2">
                        <User className="h-4 w-4" />
                        Profile
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="gap-2">
                        <Bell className="h-4 w-4" />
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger value="children" className="gap-2">
                        <MessageCircle className="h-4 w-4" />
                        Children
                    </TabsTrigger>
                    <TabsTrigger value="privacy" className="gap-2">
                        <Shield className="h-4 w-4" />
                        Privacy
                    </TabsTrigger>
                </TabsList>

                {/* Profile Settings */}
                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-[#31326F] font-bold">Profile Information</CardTitle>
                            <CardDescription>
                                Update your account details and preferences
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        value={profile?.first_name || ""}
                                        onChange={(e) => handleProfileChange('first_name', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        value={profile?.last_name || ""}
                                        onChange={(e) => handleProfileChange('last_name', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={profile?.email || ""}
                                    onChange={(e) => handleProfileChange('email', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={profile?.phone_number || ""}
                                    onChange={(e) => handleProfileChange('phone_number', e.target.value)}
                                />
                            </div>

                            <Separator />

                            <div className="flex justify-end gap-3">
                                <Button variant="outline">Cancel</Button>
                                <Button>Save Changes</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notification Settings */}
                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-[#31326F] font-bold">Notification Preferences</CardTitle>
                            <CardDescription>
                                Choose what updates you want to receive
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Performance Alerts</Label>
                                        <p className="text-sm text-slate-500">
                                            Get notified when performance drops significantly
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Activity Reminders</Label>
                                        <p className="text-sm text-slate-500">
                                            Remind when child hasn't practiced recently
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Weekly Reports</Label>
                                        <p className="text-sm text-slate-500">
                                            Receive weekly progress summaries via email
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Achievement Notifications</Label>
                                        <p className="text-sm text-slate-500">
                                            Get notified about milestones and achievements
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Skill Mastery Updates</Label>
                                        <p className="text-sm text-slate-500">
                                            Notifications when child masters new skills
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <Label>Notification Frequency</Label>
                                    <Select defaultValue="immediate">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="immediate">Immediate</SelectItem>
                                            <SelectItem value="daily">Daily Digest</SelectItem>
                                            <SelectItem value="weekly">Weekly Summary</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Alert Threshold</Label>
                                    <Select defaultValue="medium">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low - All updates</SelectItem>
                                            <SelectItem value="medium">Medium - Important only</SelectItem>
                                            <SelectItem value="high">High - Critical only</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex justify-end gap-3">
                                <Button variant="outline">Reset to Defaults</Button>
                                <Button>Save Preferences</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Children Management */}
                <TabsContent value="children">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-[#31326F] font-bold">Manage Children</CardTitle>
                            <CardDescription>
                                View and manage connected children accounts
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4">
                                {children.length === 0 ? (
                                    <div className="text-center p-4 text-slate-500">
                                        No linked children found. Add a child to get started!
                                    </div>
                                ) : (
                                    children.map(child => (
                                        <div key={child.student_id} className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="font-medium text-slate-900">{child.name}</div>
                                                    <div className="text-sm text-slate-600 mt-1">
                                                        {child.grade ? ` ${child.grade}` : 'No Grade'} • Active
                                                    </div>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    Manage
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <Separator />

                            <Button variant="outline" className="w-full">
                                + Add Another Child
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Privacy Settings */}
                <TabsContent value="privacy">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-[#31326F] font-bold">Privacy & Security</CardTitle>
                            <CardDescription>
                                Manage your privacy and security settings
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Share Progress with Teacher</Label>
                                        <p className="text-sm text-slate-500">
                                            Allow teachers to view detailed progress reports
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Anonymous Analytics</Label>
                                        <p className="text-sm text-slate-500">
                                            Help improve the platform with anonymous usage data
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <Label>Data Retention</Label>
                                    <Select defaultValue="1year">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="6months">6 Months</SelectItem>
                                            <SelectItem value="1year">1 Year</SelectItem>
                                            <SelectItem value="2years">2 Years</SelectItem>
                                            <SelectItem value="forever">Forever</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p className="text-xs text-slate-500">
                                        How long to keep historical learning data
                                    </p>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-3">
                                <Button variant="outline" className="w-full">
                                    Change Password
                                </Button>
                                <Button variant="outline" className="w-full">
                                    Download My Data
                                </Button>
                                <Button variant="destructive" className="w-full">
                                    Delete Account
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
