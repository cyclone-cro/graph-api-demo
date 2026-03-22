const fs = require("fs");
const users = require("./data/users.json");
const { isInactive, generateStats } = require("./services/graphService");
const { log } = require("./utils/logger");

const args = process.argv.slice(2);

let filteredUsers = users;

// Filter inactive
if (args.includes("--inactive")) {
    filteredUsers = users.filter(u => isInactive(u));
}

log("Simulating Microsoft Graph user activity...\n");

filteredUsers.forEach(user => {
    console.log("----------------------------------");
    console.log("Name:", user.displayName);
    console.log("Email:", user.mail);
    console.log("Department:", user.department);
    console.log("Last Activity:", user.lastActivityDateTime);

    if (isInactive(user)) {
        console.log("WARNING: User inactive for 30+ days");
    }
});

// Stats
const stats = generateStats(filteredUsers);

console.log("\n=========== Summary ===========");
console.log("Total Users:", stats.total);
console.log("Active:", stats.active);
console.log("Inactive:", stats.inactive);

// Export CSV
if (args.includes("--export")) {
    let csv = "Name,Email,Department,LastActivity\n";

    filteredUsers.forEach(u => {
        csv += `${u.displayName},${u.mail},${u.department},${u.lastActivityDateTime}\n`;
    });

    fs.writeFileSync("report.csv", csv);
    log("Report exported to report.csv");
}