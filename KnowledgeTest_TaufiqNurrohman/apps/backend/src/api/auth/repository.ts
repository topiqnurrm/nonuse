import prisma from "@/config/prisma";

export class AuthRepository {
  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email, deleted_at: null },
      select: {
        id: true,
        name: true,
        password: true,
      },
    });
  }

  async findById(id: string) {
    return await prisma.user.findUnique({
      where: { id, deleted_at: null },
      select: {
        id: true,
        name: true,
        email: true,
        avatar_url: true,
      },
    });
  }
}
