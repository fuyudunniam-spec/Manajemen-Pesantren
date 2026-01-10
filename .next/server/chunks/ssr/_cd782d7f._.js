module.exports=[82376,a=>{"use strict";var b=a.i(37936),c=a.i(16349),d=a.i(18558);async function e(a){let b=(0,c.createClient)().from("blog_posts").select(`
      *,
      blog_categories (
        id,
        name,
        slug,
        color
      )
    `).order("created_at",{ascending:!1});a?.published!==void 0&&(b=b.eq("is_published",a.published)),a?.categoryId&&(b=b.eq("category_id",a.categoryId)),a?.search&&(b=b.or(`title.ilike.%${a.search}%,excerpt.ilike.%${a.search}%`)),a?.limit&&(b=b.limit(a.limit)),a?.offset&&(b=b.range(a.offset,a.offset+(a.limit||10)-1));let{data:d,error:e}=await b;return e?(console.error("Error fetching blog posts:",e),[]):d}async function f(a){let b=(0,c.createClient)(),{data:d,error:e}=await b.from("blog_posts").select(`
      *,
      blog_categories (
        id,
        name,
        slug,
        color
      )
    `).eq("slug",a).single();return e?(console.error("Error fetching blog post:",e),null):d}async function g(a){let b=(0,c.createClient)(),{data:d,error:e}=await b.from("blog_posts").select(`
      *,
      blog_categories (
        id,
        name,
        slug,
        color
      )
    `).eq("id",a).single();return e?(console.error("Error fetching blog post:",e),null):d}async function h(a){let b=(0,c.createClient)(),{data:{user:e}}=await b.auth.getUser();if(!e)throw Error("Not authenticated");let f=a.get("title"),g=a.get("slug"),h=a.get("excerpt"),i=a.get("content"),j=a.get("featured_image"),k=a.get("image_caption"),l=a.get("category_id"),m=a.get("tags"),n="true"===a.get("is_published"),{data:o,error:p}=await b.from("blog_posts").insert({title:f,slug:g,excerpt:h,content:i,featured_image:j,image_caption:k,category_id:l||null,tags:m?m.split(",").map(a=>a.trim()):[],is_published:n,published_at:n?new Date().toISOString():null,created_by:e.id,updated_by:e.id}).select().single();if(p)throw console.error("Error creating blog post:",p),Error(p.message);return(0,d.revalidatePath)("/dashboard/website/blog"),(0,d.revalidatePath)("/berita"),o}async function i(a,b){let e=(0,c.createClient)(),{data:{user:f}}=await e.auth.getUser();if(!f)throw Error("Not authenticated");let h=b.get("title"),i=b.get("slug"),j=b.get("excerpt"),k=b.get("content"),l=b.get("featured_image"),m=b.get("image_caption"),n=b.get("category_id"),o=b.get("tags"),p="true"===b.get("is_published"),q=await g(a),r=q&&!q.is_published,{data:s,error:t}=await e.from("blog_posts").update({title:h,slug:i,excerpt:j,content:k,featured_image:l,image_caption:m,category_id:n||null,tags:o?o.split(",").map(a=>a.trim()):[],is_published:p,published_at:p&&r?new Date().toISOString():q?.published_at,updated_by:f.id,updated_at:new Date().toISOString()}).eq("id",a).select().single();if(t)throw console.error("Error updating blog post:",t),Error(t.message);return(0,d.revalidatePath)("/dashboard/website/blog"),(0,d.revalidatePath)("/berita"),(0,d.revalidatePath)(`/berita/${i}`),s}async function j(a){let b=(0,c.createClient)(),{error:e}=await b.from("blog_posts").delete().eq("id",a);if(e)throw console.error("Error deleting blog post:",e),Error(e.message);(0,d.revalidatePath)("/dashboard/website/blog"),(0,d.revalidatePath)("/berita")}async function k(a,b){let e=(0,c.createClient)(),{data:{user:f}}=await e.auth.getUser();if(!f)throw Error("Not authenticated");let h={is_published:b,updated_by:f.id,updated_at:new Date().toISOString()};if(b){let b=await g(a);b&&!b.published_at&&(h.published_at=new Date().toISOString())}let{error:i}=await e.from("blog_posts").update(h).eq("id",a);if(i)throw console.error("Error toggling publish status:",i),Error(i.message);(0,d.revalidatePath)("/dashboard/website/blog"),(0,d.revalidatePath)("/berita")}(0,a.i(13095).ensureServerEntryExports)([e,f,g,h,i,j,k]),(0,b.registerServerReference)(e,"40cbf0bbe7b53e6dd4bfe209d9e4ce70c6b811ddc9",null),(0,b.registerServerReference)(f,"40063d1779801464c4c64accdff167aff5b2253b7d",null),(0,b.registerServerReference)(g,"401873d7a3baf0ce4da93a44cb6fb62e0e516a8c7d",null),(0,b.registerServerReference)(h,"40ef95bca06b01a857a28c0b420df332dce5c7712f",null),(0,b.registerServerReference)(i,"60142dd1a0156de72ad66757fac963397e6e8929b6",null),(0,b.registerServerReference)(j,"40f87eda7a8a5c6ee9a26184faf2000f03182fc17f",null),(0,b.registerServerReference)(k,"60640128274db0c02ba5aaab1baaf900c50e9eb0e5",null),a.s(["createBlogPost",()=>h,"deleteBlogPost",()=>j,"getBlogPost",()=>f,"getBlogPostById",()=>g,"getBlogPosts",()=>e,"togglePublishStatus",()=>k,"updateBlogPost",()=>i])},47387,a=>{"use strict";var b=a.i(82376);a.s([],11088),a.i(11088),a.s(["40063d1779801464c4c64accdff167aff5b2253b7d",()=>b.getBlogPost,"401873d7a3baf0ce4da93a44cb6fb62e0e516a8c7d",()=>b.getBlogPostById,"40cbf0bbe7b53e6dd4bfe209d9e4ce70c6b811ddc9",()=>b.getBlogPosts,"40ef95bca06b01a857a28c0b420df332dce5c7712f",()=>b.createBlogPost,"40f87eda7a8a5c6ee9a26184faf2000f03182fc17f",()=>b.deleteBlogPost,"60142dd1a0156de72ad66757fac963397e6e8929b6",()=>b.updateBlogPost,"60640128274db0c02ba5aaab1baaf900c50e9eb0e5",()=>b.togglePublishStatus],47387)}];

//# sourceMappingURL=_cd782d7f._.js.map