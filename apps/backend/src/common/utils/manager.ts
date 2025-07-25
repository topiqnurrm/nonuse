import bcrypt from "bcryptjs";

class HashManager {
  public async hash(text: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedText = await bcrypt.hash(text, salt);
    return hashedText;
  }
  public async compare(text: string, hashedText: string) {
    return await bcrypt.compare(text, hashedText);
  }
}

export const hashManager = new HashManager();
