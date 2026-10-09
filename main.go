package main

import "fmt"

const appName = "branch-protection"

func greet(name string) string {
	return fmt.Sprintf("hello %s", name)
}

func ping() string {
	return appName + ": ok"
}

func main() {
	fmt.Println(greet("dev-1"))
	fmt.Println(ping())
}
