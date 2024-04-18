vue3-form

- Typescript
- Annotations and Decorators
- Async Http Request.
- Form Wizard
- Vue3 Composition APi


```javascript
  class formWizardPayload{
    @Required
    username:formModel
    @Email
    email:formModel
    @Required
    @Min(5)
    @Password
    password:formModel
    tellphone:formModel
}
```
