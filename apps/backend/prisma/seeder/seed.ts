import bcrypt from "bcryptjs";

import { PrismaClient } from "../../src/generated/prisma";
import { Users, Vehicles } from "./data";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database begins...");

  await Promise.all(
    Users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(
        user.password,
        await bcrypt.genSalt(10),
      );
      return prisma.user.upsert({
        where: { id: user.id },
        update: {},
        create: {
          ...user,
          password: hashedPassword,
        },
      });
    }),
  );

  await Promise.all(
    Vehicles.map(async (vehicle) =>
      prisma.vehicle.upsert({
        where: { id: vehicle.id },
        update: {},
        create: vehicle,
      }),
    ),
  );
}

main()
  .catch((e) => {
    console.error(`There was an error while seeding: ${e}`);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Database seeded successfully. Closing connection.");
    await prisma.$disconnect();
  });
