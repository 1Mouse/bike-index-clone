# Bike Index Clone

## Deployed at [Vercel](https://bike-index-clone.vercel.app/)
## Usage
> development
> ```
> pnpm dev
> ```
> build
> ```
> pnpm build
> ```
> start
> ```
> pnpm start
> ```

## Technologies used:
- Nextjs: to demonstrate understanding of cutting edge RSC technology
- TailwindCss: to increase development speed
- Class-variance-authority, tailwind merge, clsx and other plugins to sort classes and make tailwind as clean as possible.
- eslint and prettier
- Typescript
- Radix UI: for headless component with premade A11ty
- zod: to validate api response.
- SSR and React server components to provide a fast experience and eleminate client/server round trips.
- next-nprogress-bar: to handle page transitions.
- pnpm


## Features:
- Showing bikes with searching and filtering.
- Handled query params to make the results sharable like Amazon.
- Pagination with a go to certain page to enhance user experience.
- Loading spinners, loading progress bar, handle errors and empty state.
- Stolen time are shown in the users time zone captured from browser.

## Issues found in the API
- No filter for dates which hendered the implementation of this feature.
- The parameter named ``query`` which is responsiple for the full text search doesn't produce accurate results.

## Performance [Report](https://pagespeed.web.dev/analysis/https-bike-index-clone-vercel-app-bikes/y5lrag9mwm?form_factor=mobile) 
### 1- on Desktop
![image](https://github.com/user-attachments/assets/666c8cd5-374f-41a3-8ea8-9102b9456a2d)
### 2- on Mobile
![image](https://github.com/user-attachments/assets/e7e6b778-ed71-4e62-99ae-a04a70354645)



