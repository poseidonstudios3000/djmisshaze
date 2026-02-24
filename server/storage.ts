import { db } from "./db";
import {
  inquiries,
  posts,
  corporateContent,
  siteContent,
  siteImages,
  type InsertInquiry,
  type Inquiry,
  type Post,
  type InsertPost,
  type CorporateContent,
  type InsertCorporateContent,
  type SiteContent,
  type InsertSiteContent,
  type SiteImage,
  type InsertSiteImage,
} from "@shared/schema";
import { eq } from "drizzle-orm";

class InMemoryStorage implements IStorage {
  private _inquiries: Inquiry[] = [];
  private _posts: Post[] = [];
  private _corporateContent: CorporateContent[] = [];
  private _siteContent: SiteContent[] = [];
  private _siteImages: SiteImage[] = [];
  private nextId = 1;

  async createInquiry(data: InsertInquiry): Promise<Inquiry> {
    const inquiry: Inquiry = { id: this.nextId++, ...data, email: data.email ?? null, phone: data.phone ?? null, createdAt: new Date() };
    this._inquiries.push(inquiry);
    return inquiry;
  }
  async getInquiries(): Promise<Inquiry[]> { return this._inquiries; }
  async getPosts(): Promise<Post[]> { return this._posts; }
  async createPost(data: InsertPost): Promise<Post> {
    const post: Post = { id: this.nextId++, ...data, imageUrl: data.imageUrl ?? null, content: data.content ?? null, createdAt: new Date() };
    this._posts.push(post);
    return post;
  }
  async getCorporateContent(): Promise<CorporateContent[]> { return this._corporateContent; }
  async getCorporateContentByKey(sectionKey: string): Promise<CorporateContent | undefined> {
    return this._corporateContent.find(c => c.sectionKey === sectionKey);
  }
  async upsertCorporateContent(data: InsertCorporateContent): Promise<CorporateContent> {
    const idx = this._corporateContent.findIndex(c => c.sectionKey === data.sectionKey);
    const item: CorporateContent = { id: idx >= 0 ? this._corporateContent[idx].id : this.nextId++, sectionKey: data.sectionKey, content: data.content, updatedAt: new Date() };
    if (idx >= 0) this._corporateContent[idx] = item; else this._corporateContent.push(item);
    return item;
  }
  async getSiteContent(): Promise<SiteContent[]> { return this._siteContent; }
  async getSiteContentByKey(sectionKey: string): Promise<SiteContent | undefined> {
    return this._siteContent.find(c => c.sectionKey === sectionKey);
  }
  async upsertSiteContent(data: InsertSiteContent): Promise<SiteContent> {
    const idx = this._siteContent.findIndex(c => c.sectionKey === data.sectionKey);
    const item: SiteContent = { id: idx >= 0 ? this._siteContent[idx].id : this.nextId++, sectionKey: data.sectionKey, content: data.content, updatedAt: new Date() };
    if (idx >= 0) this._siteContent[idx] = item; else this._siteContent.push(item);
    return item;
  }
  async getSiteImages(): Promise<SiteImage[]> { return this._siteImages; }
  async getSiteImageByKey(imageKey: string): Promise<SiteImage | undefined> {
    return this._siteImages.find(i => i.imageKey === imageKey);
  }
  async upsertSiteImage(data: InsertSiteImage): Promise<SiteImage> {
    const idx = this._siteImages.findIndex(i => i.imageKey === data.imageKey);
    const item: SiteImage = { id: idx >= 0 ? this._siteImages[idx].id : this.nextId++, imageKey: data.imageKey, url: data.url, originalName: data.originalName, updatedAt: new Date() };
    if (idx >= 0) this._siteImages[idx] = item; else this._siteImages.push(item);
    return item;
  }
  async deleteSiteImage(imageKey: string): Promise<void> {
    this._siteImages = this._siteImages.filter(i => i.imageKey !== imageKey);
  }
}

export interface IStorage {
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiries(): Promise<Inquiry[]>;
  getPosts(): Promise<Post[]>;
  createPost(post: InsertPost): Promise<Post>;
  getCorporateContent(): Promise<CorporateContent[]>;
  getCorporateContentByKey(sectionKey: string): Promise<CorporateContent | undefined>;
  upsertCorporateContent(data: InsertCorporateContent): Promise<CorporateContent>;
  getSiteContent(): Promise<SiteContent[]>;
  getSiteContentByKey(sectionKey: string): Promise<SiteContent | undefined>;
  upsertSiteContent(data: InsertSiteContent): Promise<SiteContent>;
  getSiteImages(): Promise<SiteImage[]>;
  getSiteImageByKey(imageKey: string): Promise<SiteImage | undefined>;
  upsertSiteImage(data: InsertSiteImage): Promise<SiteImage>;
  deleteSiteImage(imageKey: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const [inquiry] = await db.insert(inquiries).values(insertInquiry).returning();
    return inquiry;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return await db.select().from(inquiries).orderBy(inquiries.createdAt);
  }

  async getPosts(): Promise<Post[]> {
    return await db.select().from(posts);
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const [post] = await db.insert(posts).values(insertPost).returning();
    return post;
  }

  async getCorporateContent(): Promise<CorporateContent[]> {
    return await db.select().from(corporateContent);
  }

  async getCorporateContentByKey(sectionKey: string): Promise<CorporateContent | undefined> {
    const [content] = await db.select().from(corporateContent).where(eq(corporateContent.sectionKey, sectionKey));
    return content;
  }

  async upsertCorporateContent(data: InsertCorporateContent): Promise<CorporateContent> {
    const existing = await this.getCorporateContentByKey(data.sectionKey);
    if (existing) {
      const [updated] = await db
        .update(corporateContent)
        .set({ content: data.content, updatedAt: new Date() })
        .where(eq(corporateContent.sectionKey, data.sectionKey))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(corporateContent).values(data).returning();
      return created;
    }
  }

  async getSiteContent(): Promise<SiteContent[]> {
    return await db.select().from(siteContent);
  }

  async getSiteContentByKey(sectionKey: string): Promise<SiteContent | undefined> {
    const [content] = await db.select().from(siteContent).where(eq(siteContent.sectionKey, sectionKey));
    return content;
  }

  async upsertSiteContent(data: InsertSiteContent): Promise<SiteContent> {
    const existing = await this.getSiteContentByKey(data.sectionKey);
    if (existing) {
      const [updated] = await db
        .update(siteContent)
        .set({ content: data.content, updatedAt: new Date() })
        .where(eq(siteContent.sectionKey, data.sectionKey))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(siteContent).values(data).returning();
      return created;
    }
  }

  async getSiteImages(): Promise<SiteImage[]> {
    return await db.select().from(siteImages);
  }

  async getSiteImageByKey(imageKey: string): Promise<SiteImage | undefined> {
    const [image] = await db.select().from(siteImages).where(eq(siteImages.imageKey, imageKey));
    return image;
  }

  async upsertSiteImage(data: InsertSiteImage): Promise<SiteImage> {
    const existing = await this.getSiteImageByKey(data.imageKey);
    if (existing) {
      const [updated] = await db
        .update(siteImages)
        .set({ url: data.url, originalName: data.originalName, updatedAt: new Date() })
        .where(eq(siteImages.imageKey, data.imageKey))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(siteImages).values(data).returning();
      return created;
    }
  }

  async deleteSiteImage(imageKey: string): Promise<void> {
    await db.delete(siteImages).where(eq(siteImages.imageKey, imageKey));
  }
}

export const storage: IStorage = db ? new DatabaseStorage() : new InMemoryStorage();
