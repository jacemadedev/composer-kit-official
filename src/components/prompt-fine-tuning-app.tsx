"use client"

import { useState } from "react"
import {
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  ChevronRight,
  ChevronsUpDown,
  Clock,
  Command,
  CreditCard,
  FileCode2,
  History,
  LifeBuoy,
  LogOut,
  PenTool,
  Save,
  Send,
  Settings,
  Share,
  Sparkles,
  SquareTerminal,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"

const data = {
  user: {
    name: "Alice Johnson",
    email: "alice@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  navMain: [
    {
      title: "Prompt Editor",
      url: "#",
      icon: PenTool,
      isActive: true,
    },
    {
      title: "History",
      url: "#",
      icon: History,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        { title: "General", url: "#" },
        { title: "API Keys", url: "#" },
        { title: "Integrations", url: "#" },
      ],
    },
  ],
  navSecondary: [
    { title: "Documentation", url: "#", icon: BookOpen },
    { title: "Support", url: "#", icon: LifeBuoy },
  ],
}

export function PromptFineTuningAppComponent() {
  const [prompt, setPrompt] = useState("")
  const [output, setOutput] = useState("")
  const [model, setModel] = useState("gpt-4")
  const [isLoading, setIsLoading] = useState(false)

  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value)
  }

  const handleModelChange = (value: string) => {
    setModel(value)
  }

  const handleFineTune = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt before fine-tuning.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    // Simulating AI processing with a delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    setOutput(`Fine-tuned output for: "${prompt}"\n\nModel used: ${model}\n\nThis is a placeholder for the AI-generated response based on your prompt. In a real application, this would be the result of processing your input through the selected AI model.`)
    setIsLoading(false)
    toast({
      title: "Success",
      description: "Prompt fine-tuned successfully!",
    })
  }

  const handleSaveDraft = () => {
    // Simulating saving draft
    toast({
      title: "Draft Saved",
      description: "Your prompt draft has been saved.",
    })
  }

  const handleShare = () => {
    // Simulating sharing functionality
    navigator.clipboard.writeText(output)
    toast({
      title: "Copied to Clipboard",
      description: "The output has been copied to your clipboard.",
    })
  }

  const handleViewHistory = () => {
    // Simulating view history functionality
    toast({
      title: "History",
      description: "Viewing prompt history is not implemented in this demo.",
    })
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <SidebarProvider>
      <div className="grid h-screen w-full md:grid-cols-[var(--sidebar-width)_1fr] md:peer-data-[state=collapsed]:grid-cols-[var(--sidebar-width-icon)_1fr]">
        <Sidebar variant="inset">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <a href="#">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <Command className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">AI Prompt Tuner</span>
                      <span className="truncate text-xs">Fine-tune your prompts</span>
                    </div>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                      {item.items?.length ? (
                        <>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuAction className="data-[state=open]:rotate-90">
                              <ChevronRight />
                              <span className="sr-only">Toggle</span>
                            </SidebarMenuAction>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.items?.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton asChild>
                                    <a href={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </a>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </>
                      ) : null}
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup className="mt-auto">
              <SidebarGroupContent>
                <SidebarMenu>
                  {data.navSecondary.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild size="sm">
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={data.user.avatar} alt={data.user.name} />
                        <AvatarFallback className="rounded-lg">AJ</AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">{data.user.name}</span>
                        <span className="truncate text-xs">{data.user.email}</span>
                      </div>
                      <ChevronsUpDown className="ml-auto size-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    side="bottom"
                    align="end"
                    sideOffset={4}
                  >
                    <DropdownMenuLabel className="p-0 font-normal">
                      <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                          <AvatarImage src={data.user.avatar} alt={data.user.name} />
                          <AvatarFallback className="rounded-lg">AJ</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-semibold">{data.user.name}</span>
                          <span className="truncate text-xs">{data.user.email}</span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Sparkles className="mr-2 h-4 w-4" />
                        <span>Upgrade to Pro</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <BadgeCheck className="mr-2 h-4 w-4" />
                        <span>Account</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Bell className="mr-2 h-4 w-4" />
                        <span>Notifications</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Prompt Editor</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Prompts</CardTitle>
                  <FileCode2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">152</div>
                  <p className="text-xs text-muted-foreground">+10% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Fine-tuned Prompts</CardTitle>
                  <PenTool className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">84</div>
                  <p className="text-xs text-muted-foreground">+23% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI Models Used</CardTitle>
                  <Bot className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">GPT-4, DALL-E, Codex</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">API Calls</CardTitle>
                  <SquareTerminal className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,324</div>
                  <p className="text-xs text-muted-foreground">+42% from last month</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Prompt Editor</CardTitle>
                  <CardDescription>Fine-tune your AI prompts here</CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="grid w-full gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="prompt">Your Prompt</Label>
                        <Textarea
                          id="prompt"
                          placeholder="Enter your prompt here..."
                          value={prompt}
                          onChange={handlePromptChange}
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="model">Model</Label>
                        <Select value={model} onValueChange={handleModelChange}>
                          <SelectTrigger id="model">
                            <SelectValue placeholder="Select AI Model" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="gpt-4">GPT-4</SelectItem>
                            <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                            <SelectItem value="dall-e">DALL-E</SelectItem>
                            <SelectItem value="codex">Codex</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleSaveDraft}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Draft
                  </Button>
                  <Button onClick={handleFineTune} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Bot className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Fine-tune Prompt
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Output</CardTitle>
                  <CardDescription>AI-generated response</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    className="min-h-[300px]"
                    placeholder="AI output will appear here..."
                    value={output}
                    readOnly
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleShare}>
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" onClick={handleViewHistory}>
                    <Clock className="mr-2 h-4 w-4" />
                    View History
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}