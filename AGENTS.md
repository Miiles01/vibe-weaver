# Architecture rules
- Manage article-specific head metadata with react-helmet-async under a single root HelmetProvider so route changes clean up metadata correctly.
- Store uploaded article photographs as optimized WebP assets via Lovable Assets pointers to keep binary media out of the source repository.