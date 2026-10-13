# Pre-release legal and privacy verification

The public legal pages are professionally drafted for the described product and preserve mandatory consumer rights, but no template can replace advice from counsel familiar with the publisher’s exact business, code, storefronts, and distribution countries.

Before publishing the app, verify every item below against the shipping app and both store configurations:

- The legal publisher/controller is correctly identified as **Danijela Devedlaka**. The public brand is **Mini Dodo**; existing approved legal policies still use “Mini Dodo Apps” as a defined name.
- The public contact email is **minidodoapps@gmail.com** and is monitored.
- Add any legally required business address, trader registration, tax/VAT identifier, or local consumer-contact information. These details were not supplied.
- The app has no advertising SDK, third-party analytics SDK, developer-operated backend, account system, social feature, user-generated content, camera access, microphone recording, contacts access, location access, or device-ID collection.
- Review all Apple and Google frameworks and third-party SDKs, including privacy manifests or data-safety declarations, network traffic, diagnostics, receipt handling, and data-retention behavior.
- Confirm that app settings and entitlements are handled on-device or by the selected app-store platform as described.
- Confirm that 15 farm animals are included, additional packs are one-time in-app purchases, and there is no subscription.
- Confirm the pretend-phone feature never initiates a real call and the parental gate protects every purchase/settings path.
- Confirm the support-email retention target of 24 months is operationally followed.
- Confirm Serbia is the intended governing-law choice and review country-specific consumer, child-design, accessibility, and language requirements for every launch market.
- Complete a child-focused privacy and risk assessment where required, including GDPR/UK GDPR children’s safeguards, the UK Children’s Code if applicable, and COPPA if the app is offered in the United States.
- Ensure the Apple App Store privacy label and Google Play Data safety disclosures exactly match the app and all third-party code.
- Re-check the policies whenever code, SDKs, purchases, support tools, hosting, analytics, advertising, or launch countries change.

The landing-page statements and `llms*.txt` files repeat these product facts, so update all public surfaces together if a fact changes.

## Multilingual website review

Before publishing the multilingual website, have qualified human reviewers check all six translations of the full Privacy Policy and Terms of Service against the English source, including Serbian Cyrillic terminology. Review governing law, consumer remedies, liability limits, COPPA/GDPR/UK GDPR wording, store roles, support retention, and controller identity. Translation does not establish legal approval.

The Privacy Policy now discloses the language preference stored under mini-dodo-language in browser localStorage. Review this preference-storage disclosure and any applicable storage consent/exemption requirements for the launch markets. The setting is only used at unprefixed entry URLs; explicit locale URLs take precedence. No browser-language detection, analytics, advertising, or cookies were added.

The existing effective/updated date (29 August 2026) is retained and displayed in each language. Confirm the appropriate publication/effective date before release. Product names, the operator’s name, emails, legal references, and the original artwork remain unchanged. No promise of support in seven languages has been added.

## Release-preparation evidence — 13 October 2026

The owner confirmed in this task that legal/privacy/store review and the team's F01/F02/F03/F05 corrections are approved. This records the owner's confirmation; it is not an independent legal opinion or proof of a named counsel's review. The owner also explicitly approved adding the Google Play operator address to all existing Contact pages:

**Danijela Devedlaka — Oberer Hoppenlauweg 10, 70174 Stuttgart, Germany.**

The public brand remains **Mini Dodo**. These details are centralized in `src/config.ts`, displayed on all seven Contact pages and reflected in Organization JSON-LD. No Privacy Policy or Terms of Service wording, governing law, effective date or existing URL was changed.

Evidence checked:

| Item                            | Observed evidence                                                                                                                                                                                                                                                           | Limits / responsibility                                                                                                                                                                                                                  |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Store identity and availability | The [live Google Play listing](https://play.google.com/store/apps/details?id=de.minidodoapps.babyphone) identifies Mini Dodo, Danijela Devedlaka and the approved Stuttgart address. Android is installable; iOS remains coming soon, with no App Store link.               | Store declarations remain the publisher's responsibility.                                                                                                                                                                                |
| App claims                      | Google Play describes 67 animal sounds, seven displayed text languages, a parental gate, no third-party ads and optional one-time packs without a subscription.                                                                                                             | Verify the exact shipping binary, purchases and all entry paths; website code cannot prove runtime behavior.                                                                                                                             |
| App dependencies                | Read-only inspection of the neighboring Flutter project found audioplayers, in_app_purchase (Android Billing / StoreKit), shared_preferences and url_launcher; no Firebase, advertising or analytics package was declared. The lockfile includes a transitive HTTP library. | Absence of an SDK name does not prove absence of all data processing. The adjacent checkout is not independently proven identical to the published binary.                                                                               |
| Device and platform processing  | Local code uses text localization, store purchase streams/restore/completion and external launch of existing legal/contact URLs. Release merged Android manifests include Billing, network-state and Internet permissions.                                                  | Network permissions can serve platform SDK behavior; they are not proof of developer collection. Confirm SDK traffic, platform diagnostics, privacy manifests and data retention using the shipping app.                                 |
| Data safety                     | Google Play currently declares no collection and no third-party sharing. Website disclosures distinguish app, store, GitHub hosting and adult support communications.                                                                                                       | Publisher must confirm Data safety and future Apple privacy labels against every dependency and real network behavior.                                                                                                                   |
| German operator information     | The owner authorized the address on Contact. [DDG §5](https://www.gesetze-im-internet.de/ddg/__5.html) requires provider identity/address and applicable additional details for covered services.                                                                           | Counsel/responsible operator should confirm whether the Contact presentation and link label suffice, and whether any trader/register, VAT, direct-communication or other information applies. Do not invent registration or tax numbers. |
| Governing law and naming        | Approved policies retain the Mini Dodo Apps defined name and Serbian governing-law wording; the store lists a German address.                                                                                                                                               | This is a review question rather than a finding that the chosen law is invalid. Confirm with the responsible person/counsel before any policy rewrite.                                                                                   |

The 24-month support retention target, country-specific duties, child-focused risk assessments and policy translations cannot be operationally verified from the repository. Maintain the owner's legal sign-off and re-review when facts change. No new independent legal approval is claimed.
