package main

import "fmt"

const appName = "branch-protection"
const buildTag = "dev-1-wip"

func greet(name string) string {
	return fmt.Sprintf("hello %s", name)
}

func ping() string {
	return appName + ": ok from dev-2"
}

func ready() string {
	return buildTag + " ready"
}

func main() {
	fmt.Println(greet("dev-1"))
	fmt.Println(ping())
	fmt.Println(ready())
	fmt.Println(status())
}
