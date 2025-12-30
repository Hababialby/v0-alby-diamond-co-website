export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  image: string
  readTime: string
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Ultimate Guide to Choosing an Engagement Ring',
    excerpt: 'Selecting the perfect engagement ring is one of the most important decisions you will make. Here is everything you need to know.',
    content: 'When choosing an engagement ring, there are several key factors to consider. First, understand the 4 Cs of diamonds: Cut, Color, Clarity, and Carat weight. The cut is often considered the most important factor as it determines how brilliantly the diamond sparkles...',
    author: 'Sarah Anderson',
    date: '2024-01-15',
    category: 'Engagement',
    image: '/placeholder.svg?height=600&width=1200',
    readTime: '8 min read'
  },
  {
    id: '2',
    title: 'Understanding Diamond Certification: GIA vs AGS',
    excerpt: 'Learn about the differences between major diamond certification laboratories and why certification matters.',
    content: 'Diamond certification provides an independent assessment of a diamond quality and characteristics. The two most respected laboratories are GIA (Gemological Institute of America) and AGS (American Gem Society)...',
    author: 'Michael Chen',
    date: '2024-01-10',
    category: 'Education',
    image: '/placeholder.svg?height=600&width=1200',
    readTime: '6 min read'
  },
  {
    id: '3',
    title: 'Caring for Your Diamond Jewelry: Tips from Our Experts',
    excerpt: 'Keep your precious jewelry looking brilliant for years to come with these professional care tips.',
    content: 'Proper care and maintenance will keep your diamond jewelry sparkling for generations. Regular cleaning is essential, but it is important to use the right methods...',
    author: 'Emma Wilson',
    date: '2024-01-05',
    category: 'Care & Maintenance',
    image: '/placeholder.svg?height=600&width=1200',
    readTime: '5 min read'
  },
  {
    id: '4',
    title: 'Trending Engagement Ring Styles for 2024',
    excerpt: 'Discover the latest trends in engagement rings, from vintage-inspired designs to modern minimalism.',
    content: 'This year engagement ring trends are all about personal expression and unique designs. We are seeing a resurgence of vintage-inspired settings, particularly art deco styles with geometric patterns and intricate details...',
    author: 'Sarah Anderson',
    date: '2023-12-28',
    category: 'Trends',
    image: '/placeholder.svg?height=600&width=1200',
    readTime: '7 min read'
  },
  {
    id: '5',
    title: 'The History of Diamond Engagement Rings',
    excerpt: 'Explore the fascinating history of how diamonds became the symbol of eternal love and commitment.',
    content: 'The tradition of diamond engagement rings is relatively modern, dating back to the late 19th century. Before diamonds became popular, other gemstones and simple bands were commonly used...',
    author: 'David Martinez',
    date: '2023-12-20',
    category: 'History',
    image: '/placeholder.svg?height=600&width=1200',
    readTime: '10 min read'
  },
  {
    id: '6',
    title: 'Lab-Grown vs Natural Diamonds: What You Need to Know',
    excerpt: 'An unbiased comparison of lab-grown and natural diamonds to help you make an informed decision.',
    content: 'The debate between lab-grown and natural diamonds has become increasingly relevant as technology advances. Both types are chemically identical, but there are important differences to consider...',
    author: 'Michael Chen',
    date: '2023-12-15',
    category: 'Education',
    image: '/placeholder.svg?height=600&width=1200',
    readTime: '9 min read'
  },
]
