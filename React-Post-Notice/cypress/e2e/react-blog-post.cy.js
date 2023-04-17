/* eslint-disable no-undef */

import data from "../../submissionData.json"; // do not create this file
// const data = [
//   {
//     submission_link: "http://localhost:3000",
//     id: "manish-local",
//     json_server_link: `http://localhost:8080/`,
//   },
// ];

const users = [
  {
    id: 1,
    username: "john.doe",
    password: "password123",
    role: "admin",
  },
  {
    id: 2,
    username: "jane.doe",
    password: "password456",
    role: "user",
  },
  {
    id: 3,
    username: "bob.smith",
    password: "password789",
    role: "user",
  },
];

const dbjson = {
  users: [
    {
      id: 1,
      username: "john.doe",
      password: "password123",
      role: "admin",
    },
    {
      id: 2,
      username: "jane.doe",
      password: "password456",
      role: "user",
    },
    {
      id: 3,
      username: "bob.smith",
      password: "password789",
      role: "user",
    },
  ],
  notices: [
    {
      id: 1,
      title: "Important Announcement",
      message:
        "All employees are required to attend the meeting tomorrow at 10am in the conference room.",
      date: "2022-01-01",
      category: "Announcement",
      author_id: 2,
    },
    {
      id: 2,
      title: "Holiday Party Invitation",
      message:
        "Join us for our annual holiday party on December 15th at 6pm in the break room. Food and drinks will be provided!",
      date: "2022-01-02",
      category: "Event",
      author_id: 3,
    },
    {
      id: 3,
      title: "Department Meeting",
      message:
        "There will be a department meeting on Wednesday, December 20th at 2pm in the conference room.",
      date: "2022-01-03",
      category: "Meeting",
      author_id: 2,
    },
    {
      id: 4,
      title: "New Employee Orientation",
      message:
        "All new employees are required to attend orientation on their first day of work. Please report to the HR office at 9am.",
      date: "2022-01-04",
      category: "Announcement",
      author_id: 1,
    },
  ],
};

const sortedDbjsonArray = [
  {
    id: 4,
    title: "New Employee Orientation",
    message:
      "All new employees are required to attend orientation on their first day of work. Please report to the HR office at 9am.",
    date: "2022-01-04",
    category: "Announcement",
    author_id: "john.doe",
  },
  {
    id: 3,
    title: "Department Meeting",
    message:
      "There will be a department meeting on Wednesday, December 20th at 2pm in the conference room.",
    date: "2022-01-03",
    category: "Meeting",
    author_id: "jane.doe",
  },
  {
    id: 2,
    title: "Holiday Party Invitation",
    message:
      "Join us for our annual holiday party on December 15th at 6pm in the break room. Food and drinks will be provided!",
    date: "2022-01-02",
    category: "Event",
    author_id: "bob.smith",
  },
  {
    id: 1,
    title: "Important Announcement",
    message:
      "All employees are required to attend the meeting tomorrow at 10am in the conference room.",
    date: "2022-01-01",
    category: "Announcement",
    author_id: "jane.doe",
  },
];

const Announcementdbjson = [
  {
    id: 4,
    title: "New Employee Orientation",
    message:
      "All new employees are required to attend orientation on their first day of work. Please report to the HR office at 9am.",
    date: "2022-01-04",
    category: "Announcement",
    author_id: "john.doe",
  },
  {
    id: 1,
    title: "Important Announcement",
    message:
      "All employees are required to attend the meeting tomorrow at 10am in the conference room.",
    date: "2022-01-01",
    category: "Announcement",
    author_id: "jane.doe",
  },
];

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

data.forEach(({ submission_link: url, id, json_server_link: server_url }) => {
  describe("react-blog-posts", function () {
    let acc_score = 1;

    beforeEach(() => {
      if (url.charAt(url.length - 1) != "/") {
        url = url + "/";
      }
      cy.writeFile("db.json", dbjson, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });

    it(`check if authentication is working properly and showing error message for invalid credentials`, () => {
      cy.visit(url);
      cy.get(`input[name="username"]`)
        .clear()
        .type("invalidusername@gmail.com");
      cy.get(`input[type="password"]`).clear().type("invalidpassword");
      cy.get(`[data-testid="loginForm"] form`).submit();
      cy.get("p").should("be.visible").should("contain", "Invalid credentials");
      cy.intercept("GET", "**/users**").as("getuserdata");
      cy.get(`input[name="username"]`).clear().type(users[0].username);
      cy.get(`input[type="password"]`).clear().type(users[0].password);
      cy.get(`[data-testid="loginForm"] form`).submit();
      cy.wait("@getuserdata");
      cy.get(`[data-testid="welcomemessage"]`).should("be.visible");
      cy.get(`[data-testid="loginForm"] form`).should("not.exist");
      cy.then(() => {
        acc_score += 2;
      });
    });

    it("check whether welcome message is visible or not after successful login", () => {
      cy.visit(url);
      cy.intercept("GET", "**users**").as("getuserdata");
      cy.get(`input[name="username"]`).clear().type(users[0].username);
      cy.get(`input[type="password"]`).clear().type(users[0].password);
      cy.get(`[data-testid="loginForm"] form`).submit();
      cy.wait("@getuserdata");
      cy.get(`[data-testid="welcomemessage"]`).should("contain", "john.doe");
      cy.visit(url);
      cy.get(`input[name="username"]`).clear().type(users[1].username);
      cy.get(`input[type="password"]`).clear().type(users[1].password);
      cy.get(`[data-testid="loginForm"] form`).submit();
      cy.wait("@getuserdata");
      cy.get(`[data-testid="welcomemessage"]`).should("contain", "jane.doe");
      cy.then(() => {
        acc_score += 1;
      });
    });

    it("After login correct number of notices as per db.json are present or not", () => {
      cy.visit(url);
      cy.intercept("GET", "**/users**").as("getuserdata");
      cy.get(`input[name="username"]`).clear().type(users[1].username);
      cy.get(`input[type="password"]`).clear().type(users[1].password);
      cy.get(`[data-testid="loginForm"] form`).submit();
      cy.wait("@getuserdata");
      cy.get(`[data-testid="welcomemessage"]`).should("contain", "jane.doe");
      cy.get(`.notice-container`).should("have.length", dbjson.notices.length);
      cy.then(() => {
        acc_score += 2;
      });
    });

    it("After login all the notices are present in sorted way", () => {
      cy.visit(url);
      cy.intercept("GET", "**/users**").as("getuserdata");
      cy.get(`input[name="username"]`).clear().type(users[2].username);
      cy.get(`input[type="password"]`).clear().type(users[2].password);
      cy.intercept("GET", "**/notices**").as("getpostsdata");
      cy.get(`[data-testid="loginForm"] form`).submit();
      cy.wait("@getuserdata");
      cy.wait("@getpostsdata");
      cy.get(`[data-testid="welcomemessage"]`).should("contain", "bob.smith");
      cy.get(`.notice-container`).should("have.length", dbjson.notices.length);
      cy.wait(200);
      for (let i = 0; i < sortedDbjsonArray.length; i++) {
        cy.get(`.notice-container .notice-title`)
          .eq(i)
          .should("contain", sortedDbjsonArray[i].title);
        cy.get(`.notice-container .notice-title span`)
          .eq(i)
          .should("contain", sortedDbjsonArray[i].category);
        cy.get(`.notice-container .notice-message`)
          .eq(i)
          .should("contain", sortedDbjsonArray[i].message);
        cy.get(`.notice-container .notice-message span`)
          .eq(i)
          .should("contain", sortedDbjsonArray[i].author_id);
        cy.get(`.notice-container .notice-date`)
          .eq(i)
          .should("contain", sortedDbjsonArray[i].date);
      }

      cy.then(() => {
        acc_score += 3;
      });
    });

    it("check category filter functionality is working fine or not", () => {
      cy.visit(url);
      cy.intercept("GET", "**/users**").as("getuserdata");
      cy.get(`input[name="username"]`).clear().type(users[2].username);
      cy.get(`input[type="password"]`).clear().type(users[2].password);
      cy.intercept("GET", "**/notices**").as("getnoticesdata");
      cy.get(`[data-testid="loginForm"] form`).submit();
      cy.wait("@getuserdata");
      cy.get(`[data-testid="welcomemessage"]`).should("contain", "bob.smith");
      cy.wait("@getnoticesdata");
      cy.get(`[data-testid="category-filter"]`)
        .should("be.visible")
        .select("Announcement");
      cy.wait("@getnoticesdata");
      cy.wait(50);
      for (let i = 0; i < Announcementdbjson.length; i++) {
        cy.get(`.notice-container .notice-title`)
          .eq(i)
          .should("contain", Announcementdbjson[i].title);
        cy.get(`.notice-container .notice-title span`)
          .eq(i)
          .should("contain", Announcementdbjson[i].category);
        cy.get(`.notice-container .notice-message`)
          .eq(i)
          .should("contain", Announcementdbjson[i].message);
        cy.get(`.notice-container .notice-message span`)
          .eq(i)
          .should("contain", Announcementdbjson[i].author_id);
        cy.get(`.notice-container .notice-date`)
          .eq(i)
          .should("contain", Announcementdbjson[i].date);
      }
      cy.get(`[data-testid="category-filter"]`)
        .should("be.visible")
        .select("Event");
      cy.wait("@getnoticesdata");
      cy.wait(50);
      for (let i = 0; i < 1; i++) {
        cy.get(`.notice-container .notice-title`)
          .eq(i)
          .should("contain", sortedDbjsonArray[2].title);
        cy.get(`.notice-container .notice-title span`)
          .eq(i)
          .should("contain", sortedDbjsonArray[2].category);
        cy.get(`.notice-container .notice-message`)
          .eq(i)
          .should("contain", sortedDbjsonArray[2].message);
        cy.get(`.notice-container .notice-message span`)
          .eq(i)
          .should("contain", sortedDbjsonArray[2].author_id);
        cy.get(`.notice-container .notice-date`)
          .eq(i)
          .should("contain", sortedDbjsonArray[2].date);
      }
      cy.then(() => {
        acc_score += 3;
      });
    });

    it("check if date filter is working fine or not", () => {
      cy.visit(url);
      cy.intercept("GET", "**/users**").as("getuserdata");
      cy.get(`input[name="username"]`).clear().type(users[2].username);
      cy.get(`input[type="password"]`).clear().type(users[2].password);
      cy.intercept("GET", "**/notices**").as("getnoticesdata");
      cy.get(`[data-testid="loginForm"] form`).submit();
      cy.wait("@getuserdata");
      cy.wait("@getnoticesdata");
      cy.get(`[data-testid="filter-date"]`)
        .should("be.visible")
        .clear()
        .type("2022-01-04");
      cy.wait("@getnoticesdata");
      cy.wait(10);
      for (let i = 0; i < 1; i++) {
        cy.get(`.notice-container .notice-title`)
          .eq(i)
          .should("contain", sortedDbjsonArray[0].title);
        cy.get(`.notice-container .notice-title span`)
          .eq(i)
          .should("contain", sortedDbjsonArray[0].category);
        cy.get(`.notice-container .notice-message`)
          .eq(i)
          .should("contain", sortedDbjsonArray[0].message);
        cy.get(`.notice-container .notice-message span`)
          .eq(i)
          .should("contain", sortedDbjsonArray[0].author_id);
        cy.get(`.notice-container .notice-date`)
          .eq(i)
          .should("contain", sortedDbjsonArray[0].date);
      }
      cy.get(`[data-testid="filter-date"]`)
        .should("be.visible")
        .clear()
        .type("2022-01-01");
      cy.wait("@getnoticesdata");
      cy.wait(10);
      for (let i = 0; i < 1; i++) {
        cy.get(`.notice-container .notice-title`)
          .eq(i)
          .should("contain", sortedDbjsonArray[3].title);
        cy.get(`.notice-container .notice-title span`)
          .eq(i)
          .should("contain", sortedDbjsonArray[3].category);
        cy.get(`.notice-container .notice-message`)
          .eq(i)
          .should("contain", sortedDbjsonArray[3].message);
        cy.get(`.notice-container .notice-message span`)
          .eq(i)
          .should("contain", sortedDbjsonArray[3].author_id);
        cy.get(`.notice-container .notice-date`)
          .eq(i)
          .should("contain", sortedDbjsonArray[3].date);
      }
      cy.then(() => {
        acc_score += 3;
      });
    });

    it("check whether clicking on add notice button is showing us the form and working as per requirement", () => {
      cy.visit(url);
      cy.intercept("GET", "**/users**").as("getuserdata");
      cy.get(`input[name="username"]`).clear().type(users[2].username);
      cy.get(`input[type="password"]`).clear().type(users[2].password);
      cy.get(`[data-testid="loginForm"] form`).submit();
      cy.wait("@getuserdata");
      cy.get(`[data-testid="addpost"]`).should("not.exist");
      cy.get(`[data-testid="addnotice-btn"]`)
        .should("be.visible")
        .should("have.text", "Add Notice")
        .click();
      cy.get(`[data-testid="addpost"]`).should("exist");
      cy.get(`[data-testid="addnotice-btn"]`)
        .should("be.visible")
        .should("have.text", "Hide Form")
        .click();
      cy.get(`[data-testid="addpost"]`).should("not.exist");
      cy.then(() => {
        acc_score += 3;
      });
    });
    it("check whether user able to add notice by his name and updating notice board in real time - 1", () => {
      cy.visit(url);
      cy.intercept("GET", "**/users**").as("getuserdata");
      cy.get(`input[name="username"]`).clear().type(users[2].username);
      cy.get(`input[type="password"]`).clear().type(users[2].password);
      cy.get(`[data-testid="loginForm"] form`).submit();
      cy.wait("@getuserdata");
      cy.get(`[data-testid="addpost"]`).should("not.exist");
      cy.get(`[data-testid="addnotice-btn"]`)
        .should("be.visible")
        .should("have.text", "Add Notice")
        .click();
      cy.get(`[data-testid="addpost"]`).should("exist");
      //adding notice
      cy.get(`[data-testid="title"]`).clear().type("Greetings");
      cy.get(`[data-testid="message"]`).clear().type("Happy New Year");
      cy.get(`[data-testid="date"]`).clear().type("2023-01-01");
      cy.get(`[data-testid="category"]`).select("Announcement");
      cy.intercept("POST", "**/notices").as("postnotice");
      cy.get(`[data-testid="addpost"]`).submit();
      cy.wait("@postnotice");
      cy.wait(100);
      let updatedNotices = [
        {
          title: "Greetings",
          message: "Happy New Year",
          date: "2023-01-01",
          category: "Announcement",
          author_id: "bob.smith",
          id: 5,
        },
        ...sortedDbjsonArray,
      ];
      console.log(updatedNotices);
      for (let i = 0; i < updatedNotices.length; i++) {
        cy.get(`.notice-container .notice-title`)
          .eq(i)
          .should("contain", updatedNotices[i].title);
        cy.get(`.notice-container .notice-title span`)
          .eq(i)
          .should("contain", updatedNotices[i].category);
        cy.get(`.notice-container .notice-message`)
          .eq(i)
          .should("contain", updatedNotices[i].message);
        cy.get(`.notice-container .notice-message span`)
          .eq(i)
          .should("contain", updatedNotices[i].author_id);
        cy.get(`.notice-container .notice-date`)
          .eq(i)
          .should("contain", updatedNotices[i].date);
      }
      cy.then(() => {
        acc_score += 3;
      });
    });
    it("check whether user able to add notice by his name and updating notice board in real time - 2", () => {
      cy.visit(url);
      cy.intercept("GET", "**/users**").as("getuserdata");
      cy.get(`input[name="username"]`).clear().type(users[1].username);
      cy.get(`input[type="password"]`).clear().type(users[1].password);
      cy.get(`[data-testid="loginForm"] form`).submit();
      cy.wait("@getuserdata");
      cy.get(`[data-testid="addpost"]`).should("not.exist");
      cy.get(`[data-testid="addnotice-btn"]`)
        .should("be.visible")
        .should("have.text", "Add Notice")
        .click();
      cy.get(`[data-testid="addpost"]`).should("exist");
      //adding notice
      cy.get(`[data-testid="title"]`).clear().type("Greetings");
      cy.get(`[data-testid="message"]`).clear().type("Happy New Year from jane.doe");
      cy.get(`[data-testid="date"]`).clear().type("2021-01-01");
      cy.get(`[data-testid="category"]`).select("Announcement");
      cy.intercept("POST", "**/notices**").as("postnotice");
      cy.get(`[data-testid="addpost"]`).submit();
      cy.wait("@postnotice");
      cy.wait(100);
      let updatedNotices = [
        ...sortedDbjsonArray,
        {
          title: "Greetings",
          message: "Happy New Year from jane.doe",
          date: "2021-01-01",
          category: "Announcement",
          author_id: "jane.doe",
          id: 5,
        },
      ];
      for (let i = 0; i < updatedNotices.length; i++) {
        cy.get(`.notice-container .notice-title`)
          .eq(i)
          .should("contain", updatedNotices[i].title);
        cy.get(`.notice-container .notice-title span`)
          .eq(i)
          .should("contain", updatedNotices[i].category);
        cy.get(`.notice-container .notice-message`)
          .eq(i)
          .should("contain", updatedNotices[i].message);
        cy.get(`.notice-container .notice-message span`)
          .eq(i)
          .should("contain", updatedNotices[i].author_id);
        cy.get(`.notice-container .notice-date`)
          .eq(i)
          .should("contain", updatedNotices[i].date);
      }
      cy.then(() => {
        acc_score += 2;
      });
    });

    it("logout button is working or not", () => {
      cy.visit(url);
      cy.intercept("GET", "**/users**").as("getuserdata");
      cy.get(`input[name="username"]`).clear().type(users[2].username);
      cy.get(`input[type="password"]`).clear().type(users[2].password);
      cy.get(`[data-testid="loginForm"] form`).submit();
      cy.wait("@getuserdata");
      cy.get(`[data-testid="logout"]`).should("be.visible").click();
      cy.get(`[data-testid="loginForm"] form`).should("exist");
      cy.get(`[data-testid="logout"]`).should("not.exist");
      cy.then(() => {
        acc_score += 1;
      });
    });

    it(`generate score`, () => {
      console.log("final score:", acc_score);
      ////////////// this should not be changed
      let result = {
        id,
        marks: Math.ceil(acc_score),
      };
      result = JSON.stringify(result);
      cy.writeFile("results.json", `\n${result},`, (err) => {
        if (err) {
          console.error(err);
        }
      });
      //////////////////
    });
  });
});
