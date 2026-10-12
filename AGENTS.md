<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep module content and navigation in the existing hub route, with appearance controlled by semantic tokens in the shared stylesheet, so visual updates preserve the navigation flow.
- Use the shared Button for hub navigation and arrow controls to keep focus and interaction behavior consistent.
- Render page artwork as a separate decorative image layer with semantic scrim tokens, keeping card contrast independent of the background image.
- Bundle the supplied laboratory background as a local PNG so it ships with the app and does not depend on a separate asset host.
