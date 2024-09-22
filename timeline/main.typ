#import "@preview/timeliney:0.0.1"
#set page(flipped: true, margin: 1cm)

#timeliney.timeline(
  show-grid: true,
  {
    import timeliney: *
      
    headerline(group(([*2024*], 14)), group(([*2025*], 8)))
    headerline(
      group(..range(4).map(n => strong(str(n + 3)))),
      group(..range(1).map(n => "Hol")),
      group(..range(8).map(n => strong(str(n + 7)))),
      group(..range(3).map(n => "Hol")),
      group(..range(3).map(n => "Exa")),
      group(..range(2).map(n => "Hol")),
      group(strong("1"))
    )
  
    taskgroup(title: [*Main part*], {
      task("Custom Hugo theme", (0, 5), style: (stroke: 2pt + blue))
      task("Static elements", (0, 5), style: (stroke: 2pt + green))
      task("Interactive elements", (5, 13), style: (stroke: 2pt + red))
    })

    taskgroup(title: [*Finishing touches*], {
      task("Add 3D models", (13, 21), style: (stroke: 2pt + orange))
      task("Integrate front-end interface", (13, 21), style: (stroke: 2pt + purple))
    })


    milestone(at: 5, style: (stroke: (dash: "dashed")), align(center, [Finish\ Non-Interactive\ Part]))
    milestone(at: 13, style: (stroke: (dash: "dashed")), align(center, [Finish\ Main\ Part]))
    milestone(at: 21, style: (stroke: (dash: "dashed")), align(center, [Launch\ New\ Website]))
  }
)
#show link: underline
#set quote(block: true)
#show: rest => columns(3, rest)

= Main Part
== Custom Hugo Theme
#link("https://retrolog.io/blog/creating-a-hugo-theme-from-scratch/")[Tutorial on creating custom theme]

#quote(attribution: [https://draft.dev/learn/creating-hugo-themes])[
  #set text(
  font: "New Computer Modern",
  size: 9pt
)
  Lately, developers are adopting static site generators like Hugo to quickly deliver content to their audience. Frameworks like these cut down on issues that pop up with scalability, version control, managing dependencies, and performance.
  
Hugo in particular offers tons of features right out of the box for creating fast, modern, and secure static websites. It’s written in Go, a powerful server-side scripting language, and offers a clean workflow for creating landing pages, portfolios, documentation, or blogs without a lot of extra layers of complexity.

Hugo also has plenty of themes ready to go right away, but a prebuilt theme probably isn’t going to match your brand’s vision. Most likely, you’re going to want a custom theme, something that affords you fine-grained control over things like color schemes, typography, and UI components.
]
== Static elements
#image("static.png")
Elements that do not animate when hovered/clicked.

== Interactive elements
#image("interactive.png")
Crazy cool elements that make people go woooow.

= Finishing touches
== Add 3D models
#image("3Dmodels.png")
Allow users to interactively look around the models of the spacecrafts, using the #link("https://threejs.org/")[three.js] JavaScript library. #link("https://eyes.nasa.gov/apps/solar-system/#/home")[NASA example usage of three.js]
== Integrate front-end interface
Enable development team to also edit website using a graphical interface,
instead of only a text editor (like VSCode, vim, IntelliJ, Atom, Emacs).

#link("https://gohugo.io/tools/front-ends/")[Hugo recommended front-ends]