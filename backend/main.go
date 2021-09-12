package main

import (
	"encoding/json"
	"io/ioutil"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type DateData struct {
	ID          uint   `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Image       string `json:"image"`
}

func main() {
	app := fiber.New()

	app.Static("images", "./images")
	app.Use(cors.New())

	app.Get("/:id", func(c *fiber.Ctx) error {
		id, err := strconv.ParseUint(c.Params("id"), 10, 32)
		if err != nil {
			return fiber.NewError(fiber.StatusBadGateway, err.Error())
		}

		dataBytes, err := ioutil.ReadFile("nftDate.json")
		if err != nil {
			return fiber.NewError(fiber.StatusBadGateway, err.Error())
		}

		nftDates := new([]DateData)

		err = json.Unmarshal(dataBytes, nftDates)
		if err != nil {
			return fiber.NewError(fiber.StatusBadGateway, err.Error())
		}

		dateData := *nftDates

		return c.JSON(dateData[id-1])
	})

	app.Listen(":5000")
}
